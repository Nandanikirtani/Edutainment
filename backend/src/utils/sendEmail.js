import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 🔹 Single Transporter Config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS?.replace(/\s/g, ''), // Remove all spaces
  },
  tls: {
    rejectUnauthorized: false
  }
});

// 🔹 Debug environment variables
console.log("🔧 Email Configuration Debug:");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not set");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Set (length: " + process.env.EMAIL_PASS.length + ")" : "Not set");

// 🔹 Verify SMTP Connection
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Error:", error.message);
    if (error.code === 'EAUTH') {
      console.log("🔧 Authentication failed - check your app password");
    }
  } else {
    console.log("✅ SMTP Ready to send OTP emails");
  }
});

// 🔹 Send OTP Function
export const sendOtpEmail = async (to, otp, fullName) => {
  // Always log OTP to console for testing
  console.log(`\n🔐 ===== OTP DETAILS =====`);
  console.log(`📧 Email: ${to}`);
  console.log(`👤 Name: ${fullName}`);
  console.log(`🔢 OTP: ${otp}`);
  console.log(`⏰ Valid for: 5 minutes`);
  console.log(`========================\n`);
  
  try {
    const mailOptions = {
      from: {
        name: 'Edutainment Platform',
        address: process.env.EMAIL_USER
      },
      to: to,
      subject: `🔐 Your OTP: ${otp} - Edutainment Registration`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>OTP Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🎓 Edutainment</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Learning Platform</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Hello ${fullName}! 👋</h2>
            <p>Thank you for registering with Edutainment. To complete your registration, please use the OTP below:</p>
            
            <div style="background: white; border: 2px dashed #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="font-size: 36px; color: #667eea; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            
            <p><strong>⏰ This OTP will expire in 5 minutes.</strong></p>
            <p>If you didn't request this OTP, please ignore this email.</p>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>© 2024 Edutainment Platform. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${fullName}, Your OTP for Edutainment registration is: ${otp}. This OTP will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email successfully sent to ${to}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    
    // Check specific error types
    if (error.code === 'EAUTH') {
      console.log(`🔧 Email authentication failed. Please check:`);
      console.log(`   - EMAIL_USER: ${process.env.EMAIL_USER ? 'Set' : 'Not set'}`);
      console.log(`   - EMAIL_PASS: ${process.env.EMAIL_PASS ? 'Set' : 'Not set'}`);
      console.log(`   - Make sure 2-factor authentication is enabled and app password is used`);
    }
    
    // Don't throw error, just return false
    return false;
  }
};
