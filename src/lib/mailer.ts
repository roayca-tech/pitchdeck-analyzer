import nodemailer from 'nodemailer';

// If credentials are not set, we use ethersender ethereal or just log it to console
export async function sendReportEmail(toEmail: string, pdfBuffer: Buffer, companyName: string): Promise<void> {
  const isMock = !process.env.SMTP_HOST;

  let transporter;
  
  if (isMock) {
    // For local development without SMTP setup, use Ethereal Mail
    console.log("No SMTP credentials found, creating Ethereal mock account...");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  const mailOptions = {
    from: '"PitchDeck Analyzer AI" <noreply@pitchdeckai.com>',
    to: toEmail,
    subject: `Your AI Pitch Deck Analysis for ${companyName || 'your startup'}`,
    text: `Hello,\n\nYour pitch deck analysis is complete!\n\nPlease find the attached PDF report.\n\nBest,\nPitchDeck AI Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto;">
        <h2>Your AI Analysis is Ready!</h2>
        <p>Hello,</p>
        <p>Thank you for using <strong>PitchDeck Analyzer</strong>. Our AI has completed a comprehensive review of your pitch deck.</p>
        <p>Please find your detailed report attached to this email.</p>
        <br/>
        <p>Best regards,<br/>The PitchDeck AI Team</p>
      </div>
    `,
    attachments: [
      {
        filename: `${companyName ? companyName.replace(/ /g, '_') : 'Startup'}_Analysis_Report.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  
  if (isMock) {
    console.log("Ethereal Mail URL: " + nodemailer.getTestMessageUrl(info));
  } else {
    console.log("Email sent: " + info.messageId);
  }
}
