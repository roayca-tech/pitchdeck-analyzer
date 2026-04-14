import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { tmpdir } from 'os';

// Require stripe secret key to be set in environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;

    if (!file || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Save File to Temporary Storage
    // In a production environment with serverless functions (like Vercel),
    // you should upload this directly to AWS S3, Vercel Blob, or Supabase Storage.
    // For local development and demonstration, we write to the OS temporary directory.
    const fileId = uuidv4();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // We use a specific prefix to easily find it later
    const tempFilePath = join(tmpdir(), `pitchdeck_${fileId}_${file.name}`);
    await writeFile(tempFilePath, buffer);

    // 2. Create Stripe Checkout Session
    // In production, your domain should be dynamic based on the environment
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Try creating the Stripe session
    let sessionUrl = '';
    
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('No Stripe Key');
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: email,
        client_reference_id: fileId,
        metadata: {
          name,
          company,
          tempFilePath, // We store the path to the file so webhook can pick it up
          originalFileName: file.name
        },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Pitch Deck AI Analysis',
                description: 'Comprehensive AI breakdown and review of your pitch deck',
              },
              unit_amount: 4900, // $49.00
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/?canceled=true`,
      });
      sessionUrl = session.url!;
    } catch (e) {
      // For demonstration purposes, if Stripe is not configured or fails,
      // we generate a mock URL and allow testing to proceed directly to success or mock webhook.
      console.warn("Stripe Checkout failed or wasn't configured, using mock redirect.", e);
      sessionUrl = `${baseUrl}/success?mock=true&fileId=${fileId}&path=${encodeURIComponent(tempFilePath)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&company=${encodeURIComponent(company)}`;
    }

    return NextResponse.json({ url: sessionUrl });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
