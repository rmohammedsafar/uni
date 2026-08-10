/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - VERCEL SERVERLESS BACKEND EMAIL DISPATCHER
   API Endpoint: POST /api/send-email
   ========================================================================== */

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const senderEmail = process.env.SENDER_EMAIL || "r.mohammedsafar@gmail.com";
  const senderPass = process.env.SENDER_PASS;

  try {
    const { toEmail, toName, trackingId, program, tuition, status, type } = req.body || {};

    if (!toEmail) {
      return res.status(400).json({ error: 'Missing required recipient email parameter (toEmail).' });
    }

    const isBrochure = type === 'brochure';
    const subject = isBrochure 
      ? `[UEF BROCHURE] Official Brochure Requested: ${program || 'Degree Program'}`
      : `[CONFIRMATION] Application Received (${trackingId || 'UEF-2026'}) - University of East Florida`;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f0709; color: #fcf8f2; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #140b0e; border: 1px solid #d4af37; border-radius: 12px; padding: 30px; }
            .header { border-bottom: 2px solid #6b111c; padding-bottom: 15px; margin-bottom: 20px; text-align: center; }
            .title { color: #d4af37; font-size: 22px; font-weight: bold; margin: 0; }
            .sub { color: #c7b8b2; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .badge { background: #ecfdf5; border: 1px solid #10b981; color: #047857; padding: 6px 12px; border-radius: 20px; font-weight: bold; display: inline-block; font-size: 12px; }
            .box { background: #1e090e; border: 1px solid rgba(212,175,55,0.3); padding: 18px; border-radius: 8px; margin: 20px 0; font-size: 14px; }
            .footer { border-top: 1px solid #333; margin-top: 30px; padding-top: 15px; font-size: 11px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 class="title">UNIVERSITY OF EAST FLORIDA</h2>
              <div class="sub">100% Online Global Campus • Orlando, FL, USA</div>
            </div>

            <div style="text-align: right; margin-bottom: 15px;">
              <span class="badge">✓ OFFICIAL CONFIRMATION DISPATCH</span>
            </div>

            <p style="font-size: 16px;">Dear <strong>${toName || 'Student'}</strong>,</p>

            <p>
              ${isBrochure 
                ? `Thank you for requesting the official 100% online program brochure for <strong>${program}</strong>.`
                : `Thank you for submitting your official application and academic marksheets to the <strong>University of East Florida</strong>.`}
            </p>

            <div class="box">
              ${trackingId ? `<p style="margin: 4px 0;"><strong>Tracking Reference ID:</strong> <span style="color: #d4af37; font-family: monospace; font-weight: bold;">${trackingId}</span></p>` : ''}
              <p style="margin: 4px 0;"><strong>Target Program:</strong> ${program || '100% Online Degree'}</p>
              ${tuition ? `<p style="margin: 4px 0;"><strong>Tuition Fee:</strong> ${tuition}</p>` : ''}
              <p style="margin: 4px 0;"><strong>Admissions Status:</strong> ${status || 'APPLICATION UNDER REVIEW'}</p>
              <p style="margin: 4px 0;"><strong>Instruction Format:</strong> 100% Remote Virtual Campus (Orlando, FL, USA)</p>
            </div>

            <p>
              An international admissions advisor from our Orlando, USA campus will evaluate your details and respond within 24 to 48 hours.
            </p>

            <div class="footer">
              <strong>Office of the University Registrar</strong><br>
              University of East Florida • 1200 University Blvd, Suite 500, Orlando, FL 32816, USA<br>
              Registrar Email: ${senderEmail} | Toll-Free USA: +1 (800) 555-UEF1
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: `"UEF Office of Admissions" <${senderEmail}>`,
      to: `${toEmail}, ${senderEmail}`,
      subject: subject,
      html: htmlBody
    };

    let info = null;
    let smtpError = null;

    if (senderPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: senderEmail,
            pass: senderPass.replace(/\s+/g, '') // remove spaces from App Password
          }
        });

        info = await transporter.sendMail(mailOptions);
        console.log('✅ Real Backend Email Dispatched via Nodemailer SMTP:', info.messageId);
      } catch (err) {
        smtpError = err.message;
        console.error('❌ Gmail SMTP Error:', err);
      }
    } else {
      smtpError = "SENDER_PASS environment variable is missing on Vercel.";
    }

    return res.status(200).json({
      success: info ? true : false,
      message: info 
        ? `Real backend confirmation email sent to ${toEmail} and ${senderEmail}`
        : `Email delivery pending: ${smtpError}`,
      trackingId: trackingId || 'UEF-LOG',
      recipient: toEmail,
      senderEmail: senderEmail,
      smtpStatus: info ? 'DISPATCHED_SMTP' : 'SMTP_ERROR',
      smtpError: smtpError
    });

  } catch (error) {
    console.error('Backend Email API Exception:', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch email' });
  }
};
