import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 🔹 Single Transporter Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// 🔹 Verify SMTP Connection
transporter.verify((error, success) => {
  if (error) console.log("❌ SMTP Error:", error);
  else console.log("✅ SMTP Ready to send OTP emails");
});

// 🔹 Send OTP Function
export const sendOtpEmail = async (to, otp, fullName) => {
  try {
    await transporter.sendMail({
      from: `"MRE Awards" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: "Your Login OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your OTP Code</h2>
          <p>Hello <b>${fullName}</b>,</p>
          <p>Your OTP for login is:</p>
          <h1 style="color: #2e6c80;">${otp}</h1>
          <p>This OTP will expire in <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore.</p>
        </div>
      `,
    });
    console.log(`✅ OTP sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    throw err;
  }
};
