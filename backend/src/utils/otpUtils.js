// OTP utilities for generation and verification
import crypto from 'crypto';

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP with expiry (5 minutes)
export const storeOTP = (email, otp) => {
  const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(email, {
    otp,
    expiryTime,
    attempts: 0
  });
  
  // Auto cleanup after expiry
  setTimeout(() => {
    otpStore.delete(email);
  }, 5 * 60 * 1000);
  
  console.log(`🔐 OTP stored for ${email}: ${otp} (expires in 5 minutes)`);
};

// Store any data with expiry (for user registration data)
export const storeData = (key, data, expiryMinutes = 5) => {
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  otpStore.set(key, {
    data,
    expiryTime
  });
  
  // Auto cleanup after expiry
  setTimeout(() => {
    otpStore.delete(key);
  }, expiryMinutes * 60 * 1000);
  
  console.log(`💾 Data stored for ${key} (expires in ${expiryMinutes} minutes)`);
};

// Verify OTP
export const verifyOTP = (email, inputOtp) => {
  const storedData = otpStore.get(email);
  
  if (!storedData) {
    return { success: false, message: 'OTP not found or expired' };
  }
  
  if (Date.now() > storedData.expiryTime) {
    otpStore.delete(email);
    return { success: false, message: 'OTP has expired' };
  }
  
  // Increment attempt count
  storedData.attempts += 1;
  
  // Max 3 attempts
  if (storedData.attempts > 3) {
    otpStore.delete(email);
    return { success: false, message: 'Too many failed attempts. Please request a new OTP' };
  }
  
  if (storedData.otp !== inputOtp) {
    return { success: false, message: 'Invalid OTP' };
  }
  
  // OTP verified successfully
  otpStore.delete(email);
  return { success: true, message: 'OTP verified successfully' };
};

// Check if OTP exists for email
export const hasValidOTP = (email) => {
  const storedData = otpStore.get(email);
  return storedData && Date.now() < storedData.expiryTime;
};

// Clear OTP for email
export const clearOTP = (email) => {
  otpStore.delete(email);
  console.log(`🗑️ OTP cleared for ${email}`);
};

// Get stored data (for user registration data)
export const getStoredData = (key) => {
  const storedItem = otpStore.get(key);
  
  if (!storedItem) {
    return null;
  }
  
  // Check if data has expired
  if (Date.now() > storedItem.expiryTime) {
    otpStore.delete(key);
    return null;
  }
  
  return storedItem.data || storedItem.otp; // Handle both data objects and OTP objects
};
