const jwt = require('jsonwebtoken');
const transporter = require('../config/email');

const sendVerificationEmail = async (email, verificationCode) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `
      <h1>Verify your email</h1>
      <p>Please enter the following code to verify your email address:</p>
      <p><b>${verificationCode}</b></p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (err) {
        console.error('Error sending verification email:', err);
    }
};

const generateResetPasswordToken = () => {
    return jwt.sign({ timestamp: Date.now() }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// utils/email.js
const sendResetPasswordEmail = async (email, verificationCode) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Reset Password',
        html: `
      <h1>Reset your password</h1>
      <p>Please enter the following code to reset your password:</p>
      <p><b>${verificationCode}</b></p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset password email sent successfully');
    } catch (err) {
        console.error('Error sending reset password email:', err);
    }
};

module.exports = {
    sendVerificationEmail,
    generateResetPasswordToken,
    sendResetPasswordEmail
};