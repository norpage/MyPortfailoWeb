import {NextRequest, NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    const {name, email, message} = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({error: 'Missing fields'}, {status: 400});
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: '📬 New Message from Portfolio Website',
            html: `
  <div style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    background: linear-gradient(135deg, #121a2a, #1e2c3d);
    color: #f1f1f1;
    padding: 30px;
    border-radius: 10px;
  ">
    <div style="text-align: center;">
      <img src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/XrUM/eUE3RmGgj" alt="Logo" style="height: 60px; margin-bottom: 10px;" />
      <h2 style="color: #4fc3f7;">📬 New Contact Message</h2>
    </div>

    <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />

    <p><strong>👤 Name:</strong> ${name}</p>
    <p><strong>✉️ Email:</strong> ${email}</p>
    <p><strong>📝 Message:</strong></p>
    <div style="
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-left: 4px solid #4fc3f7;
      border-radius: 6px;
      margin-top: 5px;
      white-space: pre-line;
    ">
      ${message}
    </div>

    <hr style="border: none; border-top: 1px solid #2e3b4e; margin: 30px 0;" />

    <p style="font-size: 12px; color: #888; text-align: center;">
      This message was sent from your portfolio website.
    </p>

    <p style="text-align: center; margin-top: 10px;">
      <a href="https://Davitmeloyan.syntaxacade.my" style="
        color: #4fc3f7;
        text-decoration: none;
        font-weight: bold;
      ">
        🌐 Visit my website
      </a>
    </p>
  </div>
`,

        });

        return NextResponse.json({success: true});

    } catch (err: any) {
        console.error('Email sending error:', err);
        return NextResponse.json({error: 'Failed to send email'}, {status: 500});
    }
}
