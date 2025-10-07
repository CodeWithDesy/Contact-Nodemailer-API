import Contact from './../model/contact.model.js';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

 const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Send email using Resend API
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_RECEIVER,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
};

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
