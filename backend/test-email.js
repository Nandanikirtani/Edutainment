import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Test email configuration
const testEmail = async () => {
  console.log("🧪 Testing email configuration...");
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
  console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? 'Set (hidden)' : 'Not set'}`);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!");

    // Send test email
    const testOTP = "123456";
    const result = await transporter.sendMail({
      from: {
        name: 'Edutainment Test',
        address: process.env.EMAIL_USER
      },
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: `🧪 Test OTP: ${testOTP}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h2>🧪 Email Test Successful!</h2>
          <p>Your test OTP is: <strong style="font-size: 24px; color: #667eea;">${testOTP}</strong></p>
          <p>Email configuration is working properly! ✅</p>
        </div>
      `
    });

    console.log("✅ Test email sent successfully!");
    console.log("Message ID:", result.messageId);
    
  } catch (error) {
    console.error("❌ Email test failed:", error.message);
    
    if (error.code === 'EAUTH') {
      console.log("\n🔧 Gmail Setup Instructions:");
      console.log("1. Go to Google Account settings");
      console.log("2. Enable 2-Factor Authentication");
      console.log("3. Generate App Password:");
      console.log("   - Go to Security → App passwords");
      console.log("   - Select 'Mail' and your device");
      console.log("   - Use the generated 16-character password");
      console.log("4. Update EMAIL_PASS in .env file with app password");
    }
  }
};

testEmail();
