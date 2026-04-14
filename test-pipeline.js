require('dotenv').config({ path: '.env.local' });
const { analyzePitchDeckText } = require('./src/lib/analyzer');
const { generateReportPDF } = require('./src/lib/pdf-generator');
const { sendReportEmail } = require('./src/lib/mailer');

async function testPipeline() {
  try {
    console.log("Testing Analyzer...");
    const analysis = await analyzePitchDeckText("dummy text");
    console.log("Analysis success! Truncated:", analysis.substring(0, 100));

    console.log("Testing PDF generator...");
    const pdfBuffer = await generateReportPDF(analysis, "Test Company");
    console.log("PDF length:", pdfBuffer.length);

    console.log("Testing Ethereal mailer...");
    await sendReportEmail("test@test.com", pdfBuffer, "Test Company");
    console.log("Mail complete.");
  } catch(e) {
    console.error("Test failed:", e);
  }
}

// NextJS uses ES modules and TypeScript. We need to compile or run via ts-node.
// Actually, since I am in a vanilla CommonJS file, requiring TS files will fail.
