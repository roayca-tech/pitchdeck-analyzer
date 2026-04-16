import { writeFile } from 'fs/promises';
import { analyzePitchDeckText } from './src/lib/analyzer';
import { generateReportPDF } from './src/lib/pdf-generator';

async function testPdf() {
  console.log("Mocking analysis process...");
  // Since you don't need a real OpenAI key to test the layout, this will use the internal mock fallback we set up.
  const htmlResult = await analyzePitchDeckText("dummy pitch deck text");
  
  console.log("Generating styled PDF with Puppeteer...");
  const pdfBuffer = await generateReportPDF(htmlResult, "Mock Startup Inc.");
  
  await writeFile('test_report_preview.pdf', pdfBuffer);
  console.log('Success! Your PDF was saved as "test_report_preview.pdf" in the root directory.');
}

testPdf().catch(console.error);
