import puppeteer from 'puppeteer';

export async function generateReportPDF(analysisHtml: string, companyName: string): Promise<Buffer> {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pitch Deck Analysis: ${companyName}</title>
      <style>
:root{
    --bg:#0f1115;
    --card:#171a21;
    --muted:#9aa3b2;
    --text:#eef2f7;
    --red:#d14b5a;
    --green:#33c27f;
    --yellow:#f0c24b;
    --line:#2a303a;
    --accent:#ffffff;
  }
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter,Arial,Helvetica,sans-serif;background:var(--bg);color:var(--text);line-height:1.55}
  .wrap{max-width:1100px;margin:0 auto;padding:32px 20px 80px}
  h1,h2,h3{line-height:1.15;margin:0 0 14px}
  h1{font-size:38px}
  h2{font-size:24px;margin-top:34px;padding-top:10px;border-top:1px solid var(--line)}
  h3{font-size:18px;margin-top:20px}
  p{margin:10px 0 14px}
  .sub{color:var(--muted);font-size:15px}
  .hero{background:linear-gradient(135deg,#151922 0%,#111319 100%);border:1px solid var(--line);padding:28px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,.25)}
  .grid{display:grid;gap:16px}
  .g3{grid-template-columns:repeat(3,1fr)}
  .g2{grid-template-columns:repeat(2,1fr)}
  .card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px}
  .pill{display:inline-block;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
  .red{background:rgba(209,75,90,.16);color:#ff8a96;border:1px solid rgba(209,75,90,.35)}
  .yellow{background:rgba(240,194,75,.12);color:#ffd66d;border:1px solid rgba(240,194,75,.35)}
  .green{background:rgba(51,194,127,.14);color:#7ff0b7;border:1px solid rgba(51,194,127,.35)}
  ul{margin:10px 0 0 22px;padding:0}
  li{margin:7px 0}
  table{width:100%;border-collapse:collapse;margin-top:12px;font-size:14px}
  th,td{padding:12px 10px;border-bottom:1px solid var(--line);vertical-align:top;text-align:left}
  th{color:#cfd7e4;font-weight:700}
  .score{font-size:34px;font-weight:800;margin-top:6px}
  .muted{color:var(--muted)}
  .quote{border-left:3px solid var(--red);padding:10px 14px;background:#12161d;border-radius:10px;color:#dbe4ef}
  .small{font-size:13px;color:var(--muted)}
  .section-intro{max-width:850px;color:#dce3ee}
  .footer{margin-top:34px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:13px}
  .kpi{font-size:28px;font-weight:800}
  .center{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
  .mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
  @media (max-width:900px){.g3,.g2{grid-template-columns:1fr}}
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: var(--bg) !important;
          }
          .card, .hero {
            page-break-inside: avoid;
          }
          .wrap {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }

</style>
    </head>
    <body>
      <div class="wrap">
        ${analysisHtml}
      </div>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.6in',
        right: '0.6in',
        bottom: '0.6in',
        left: '0.6in'
      }
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
