import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateReportPDF(analysisMarkdown: string, companyName: string): Promise<Buffer> {
  const doc = await PDFDocument.create();

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage();
  const { width, height } = page.getSize();
  let yPosition = height - 60;

  const checkPageBoundary = (marginBottom = 60) => {
    if (yPosition < marginBottom) {
      page = doc.addPage();
      yPosition = height - 60;
    }
  };

  // Title
  page.drawText(`Pitch Deck Analysis: ${companyName || 'Startup'}`, {
    x: 50,
    y: yPosition,
    size: 20,
    font: boldFont,
    color: rgb(0.23, 0.51, 0.96),
  });
  yPosition -= 40;

  const lines = analysisMarkdown.split('\n');
  
  for(let line of lines) {
    if (!line.trim()) {
      yPosition -= 15;
      checkPageBoundary();
      continue;
    }

    // Clean markdown bold tags
    let isBold = false;
    let currentColor = rgb(0.2, 0.2, 0.2);
    let currentFont = font;
    let currentSize = 10;

    if (line.startsWith('# ')) {
      checkPageBoundary(80);
      line = line.replace('# ', '');
      currentFont = boldFont;
      currentSize = 16;
      currentColor = rgb(0.12, 0.16, 0.21);
      yPosition -= 10;
    } else if (line.startsWith('## ')) {
      checkPageBoundary(80);
      line = line.replace('## ', '');
      currentFont = boldFont;
      currentSize = 14;
      currentColor = rgb(0.12, 0.16, 0.21);
      yPosition -= 8;
    } else if (line.startsWith('### ')) {
      checkPageBoundary(60);
      line = line.replace('### ', '');
      currentFont = boldFont;
      currentSize = 12;
      currentColor = rgb(0.12, 0.16, 0.21);
      yPosition -= 5;
    } else if (line.startsWith('**Score:')) {
      checkPageBoundary();
      currentFont = boldFont;
      currentSize = 11;
      currentColor = rgb(0.23, 0.51, 0.96);
    } 
    
    // Strip bold asterisks for clean look
    line = line.replace(/\*\*/g, '');

    // Basic text wrapping approach
    const maxChars = 90; 
    let remainingText = line;

    while(remainingText.length > 0) {
      checkPageBoundary();
      // break at words if possible
      let breakPointer = maxChars;
      if (remainingText.length > maxChars) {
        const nextSpace = remainingText.lastIndexOf(' ', maxChars);
        if (nextSpace > 0) {
          breakPointer = nextSpace;
        }
      }
      
      const chunk = remainingText.substring(0, breakPointer);
      remainingText = remainingText.substring(breakPointer).trim();

      page.drawText(chunk, { 
        x: 50, 
        y: yPosition, 
        size: currentSize, 
        font: currentFont, 
        color: currentColor 
      });
      yPosition -= (currentSize + 4);
    }
    
    // extra spacing after big headers
    if (currentSize > 12) {
      yPosition -= 10;
    }
  }

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}
