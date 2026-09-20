const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generatePassword = require('../utils/generatePassword');
const isSameDay = require('../utils/isSameDay');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.post('/forgot', async (req, res) => {
  const { identifier } = req.body;

  if (!identifier || !identifier.trim()) {
    return res.status(400).json({ message: 'Please enter your email or phone number.' });
  }

  const cleaned = identifier.trim();
  const user = await User.findOne({
    $or: [{ email: cleaned.toLowerCase() }, { phone: cleaned }],
  });

  if (!user) {
    return res.json({ message: 'If an account exists, a new password has been sent.' });
  }

  const now = new Date();
  if (user.lastResetRequestAt && isSameDay(user.lastResetRequestAt, now)) {
    return res.status(429).json({ message: 'You can use this option only one time per day.' });
  }

  const newPassword = generatePassword(10);
  user.password = await bcrypt.hash(newPassword, 10);
  user.lastResetRequestAt = now;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: 'Your password has been reset',
    text: `Hi ${user.name},\n\nYour new temporary password is: ${newPassword}\n\nPlease log in and change it as soon as possible.`,
  });

  res.json({ message: 'A new password has been sent.' });
});

module.exports = router;