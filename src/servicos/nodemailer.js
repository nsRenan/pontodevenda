const nodemailer = require('nodemailer');
require('dotenv').config();

const transporte = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const enviarEmail = (nomeRemetente, emailRemetente, nome, email, assunto, texto) => {
  transporte.sendMail({
    from: `${nomeRemetente} <${emailRemetente}>`,
    to: `${nome} <${email}>`,
    subject: assunto,
    text: texto
  })
};

module.exports = enviarEmail;