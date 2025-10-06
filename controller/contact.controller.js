import Contact from './../model/contact.model.js';
import nodemailer from 'nodemailer';

async function sendMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;

     if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // save message in database
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    // transporter
    const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
     family: 4, // Force IPv4
  tls: {
    rejectUnauthorized: false
  }
});

    // send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `New message from ${name}`,
      text: `
        You received a new message from your portfolio site:

        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    });
    // Define mail options
const mailOptions = {
  from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
  to: process.env.MAIL_TO,
  subject: `New message from ${name}`,
  text: `
    You received a new message from your portfolio site:

    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message: ${message}
  `,
};
await transporter.sendMail(mailOptions);
    res
      .status(201)
      .json({ message: 'Message received and email sent', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }
}

async function fetchMesaage(req, res) {
  try {
    const messages = await Contact.find({});
    res
      .status(201)
      .json({ message: 'Message fetched successfully', data: messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error' });
  }
}

export { sendMessage, fetchMesaage };
