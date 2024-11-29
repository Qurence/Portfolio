import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shyposhartem@gmail.com',
    pass: 'spqhxxsjihavlkqz',
  },
});

// Маршрут для обработки формы
app.post('/send-email', (req, res) => {
  const { name, email, message, phone } = req.body;

  const mailOptions = {
    from: email,
    to: 'shyposhartem.biz@gmail.com',
    subject: 'Новая заявка с контактной формы',
    text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nСообщение: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Ошибка отправки сообщения');
    }
    console.log('Email отправлен: ' + info.response);
    res.status(200).send('Сообщение отправлено успешно');
  });
});

// Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
  console.log('Сервер запущен на http://0.0.0.0:${PORT}');
});
