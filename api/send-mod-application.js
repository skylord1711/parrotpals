import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const { name, age, discord, timezone, experience, reason, hours } = req.body;

  if (!name || !discord) {
    return res.status(400).json({ error: 'Name and Discord are required' });
  }

  const html = `
    <h2>New Mod Application</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
      <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #333;">${name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Age</td><td style="padding:8px;border:1px solid #333;">${age || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Discord</td><td style="padding:8px;border:1px solid #333;">${discord}</td></tr>
      <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Timezone</td><td style="padding:8px;border:1px solid #333;">${timezone || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Experience</td><td style="padding:8px;border:1px solid #333;">${experience || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Reason</td><td style="padding:8px;border:1px solid #333;">${reason || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Hours/Week</td><td style="padding:8px;border:1px solid #333;">${hours || 'N/A'}</td></tr>
    </table>
  `;

  try {
    if (process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Mod Application" <${process.env.GMAIL_EMAIL}>`,
        to: 'parrotpalsbusiness@gmail.com',
        subject: `Mod Application - ${name}`,
        html,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(200).json({ success: true });
  }
}
