const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const ResetPasswordToken = require('../models/ResetPasswordToken');

router.post('/request-reset', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a unique token
    const token = uuidv4();

    // Save the token in the database
    await ResetPasswordToken.create({ email, token });

    // Send an email with the reset link
    const transporter = nodemailer.createTransport({
      // configure your email service
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://your-app.com/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;