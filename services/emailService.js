// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Email service configuration
});

exports.sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: 'no-reply@community-forum.com',
    to,
    subject,
    html,
  });
};