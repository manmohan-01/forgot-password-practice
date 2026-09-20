// const nodemailer = require('nodemailer');

// async function sendEmail({ to, subject, text }) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT) || 587,
//     secure: Number(process.env.SMTP_PORT) === 465,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.SMTP_FROM || process.env.SMTP_USER,
//     to,
//     subject,
//     text,
//   });
// }

// module.exports = sendEmail;

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, text }) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    text,
  });
}

module.exports = sendEmail;