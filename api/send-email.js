/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - NODEMAILER EMAIL DISPATCH API ROUTE
   Sends automated application receipts & registrar email notifications
   ========================================================================== */

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { trackingId, fullName, studentEmail, programTitle, status, highestQual } = req.body || {};

  if (!studentEmail || !trackingId) {
    return res.status(400).json({ error: 'Missing required parameters: studentEmail or trackingId' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'r.mohammedsafar@gmail.com',
        pass: process.env.EMAIL_PASS || 'demo-app-password'
      }
    });

    const mailOptions = {
      from: '"UEF Registrar Office" <r.mohammedsafar@gmail.com>',
      to: `${studentEmail}, r.mohammedsafar@gmail.com`,
      subject: `🎓 UEF Official Application Receipt & Admission Decision [${trackingId}]`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0d090a; color: #fcf8f2; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37;">
          <div style="text-align: center; border-bottom: 2px solid #6b111c; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #f7e096; margin: 0; font-size: 22px;">UNIVERSITY OF EAST FLORIDA</h1>
            <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">100% Online Global Campus • Orlando, USA</p>
          </div>
          
          <h2 style="color: #34d399; font-size: 18px; margin-bottom: 15px;">🎉 Official Admission Decision Issued</h2>
          
          <p style="font-size: 14px; line-height: 1.6; color: #c7b8b2;">
            Dear <strong>${fullName || 'Student'}</strong>,<br><br>
            Thank you for applying to the University of East Florida. Your official application has been received and verified by the Registrar Office.
          </p>

          <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid #d4af37; padding: 18px; border-radius: 8px; margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #c7b8b2; font-size: 12px;">Tracking ID:</span>
              <strong style="color: #f7e096; font-family: monospace;">${trackingId}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #c7b8b2; font-size: 12px;">Target Program:</span>
              <strong style="color: #fff;">${programTitle || 'Degree Program'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #c7b8b2; font-size: 12px;">Highest Qualification:</span>
              <strong style="color: #fff;">${highestQual || 'Undergraduate'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #c7b8b2; font-size: 12px;">Admission Decision:</span>
              <strong style="color: #34d399;">${status || 'ADMITTED (UNCONDITIONAL)'}</strong>
            </div>
          </div>

          <p style="font-size: 12px; color: #888; text-align: center; margin-top: 25px;">
            University Registrar Office • 1200 University Blvd, Suite 500, Orlando, FL 32816, USA<br>
            Official Contact: r.mohammedsafar@gmail.com | Toll-Free: +1 (800) 555-UEF1
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: `Email dispatched to ${studentEmail} and Registrar.` });
  } catch (error) {
    console.error("Nodemailer Email error:", error);
    return res.status(500).json({ error: error.message });
  }
}
