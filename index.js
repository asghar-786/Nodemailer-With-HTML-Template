const express = require('express');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: 'useremail',
    pass: 'userpass',
  },
});

const app = express();
const port = 2000;

app.get('/', async (_, res) => {
  const source = fs.readFileSync('email_template.html', 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    username: 'Roohan',
  };
  const htmlToSend = template(replacements);

  const info = await transporter.sendMail({
    from: '',
    to: '',
    subject: 'Hello from Tixsee',
    text: 'Hello world?', 
    html: htmlToSend
  });

  console.log('Message sent: %s', info.response);
  res.send('Email Sent!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
