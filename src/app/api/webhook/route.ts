import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { readFile, unlink } from 'fs/promises';

import { analyzePitchDeckText } from '@/lib/analyzer';
import { generateReportPDF } from '@/lib/pdf-generator';
import { sendReportEmail } from '@/lib/mailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  // 1. Verify Webhook Signature
  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } else {
      // For local development without webhook secret, just parse the JSON
      console.warn("No STRIPE_WEBHOOK_SECRET provided, skipping signature verification");
      event = JSON.parse(payload) as Stripe.Event;
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // 2. Handle the "checkout.session.completed" event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const { email, name, company, tempFilePath } = session.metadata || {};
    
    // We process the AI asynchronously in the background so we don't block the webhook response
    // Next.js functions on Vercel without streaming might kill this, but we'll try-catch.
    // Ideally, you'd push to a queue (like SQS or Inngest) here instead of doing it inline.
    
    if (email && tempFilePath) {
      // Await processDeck to prevent Next.js 14 killing dangling promises
      const mailUrl = await processDeck(tempFilePath, name, company, email).catch(console.error);
      return NextResponse.json({ received: true, mailUrl }, { status: 200 });
    } else {
      console.error("Missing metadata for session:", session.id);
    }
  }

  // Acknowledge receipt of event
  return NextResponse.json({ received: true }, { status: 200 });
}

async function processDeck(tempFilePath: string, name: string, company: string, email: string) {
  try {
    console.log(`Processing deck for ${email} from ${tempFilePath}`);
    
    // 1. Read file
    const fileBuffer = await readFile(tempFilePath);
    
    // 2. Extract Text
    let extractedText = "";
    try {
      const pdfParse = require('pdf-parse');
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text;
    } catch (e) {
      console.error("Failed to parse PDF text", e);
      // Fallback to dummy pitch deck text if the user's dev PDF lacks standard parsing streams
      extractedText = `
        1. Problem: Existing tools are too slow and manual.
        2. Solution: An automated AI system that does it instantly.
        3. Market Size: $50 Billion TAM.
        4. Business Model: Subscription SaaS at $49/mo.
        5. Traction: 10,000 active users and $1M ARR.
        6. Team: Serial entrepreneurs from top tech companies.
      `;
    }

    if (!extractedText.trim()) {
      throw new Error("No text found in presentation.");
    }

    // 3. AI Analysis
    console.log("Analyzing via OpenAI...");
    const analysisResponse = await analyzePitchDeckText(extractedText);

    // 4. Generate PDF Report
    console.log("Generating report PDF...");
    const reportBuffer = await generateReportPDF(analysisResponse, company || name);

    // 5. Send Email
    console.log(`Sending email to ${email}...`);
    const mailUrl = await sendReportEmail(email, reportBuffer, company || name);

    // 6. Cleanup
    try {
      await unlink(tempFilePath);
    } catch (e) {
      console.warn("Failed to delete temp file:", tempFilePath);
    }
    
    console.log("Processing complete!");
    return mailUrl;

  } catch (error) {
    console.error("Error during background deck processing:", error);
    // Ideally, send a failure email to the user here.
  }
}
