const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});
const sendEmail = async (recipientEmail, subject, content) => {
  try {
    //i have to manually add recipientEmail to mailgun list(free tier).
    // so its better to send all mail to SENDER_EMAIL
    recipientEmail = process.env.SENDER_EMAIL;
    console.log("sendEmail", { recipientEmail, subject });
    await mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
      from: process.env.SENDER_EMAIL, // Use verified Mailgun email address
      to: recipientEmail,
      subject,
      html: content,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log({ from: process.env.SENDER_EMAIL, to: recipientEmail });
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendEmail,
};
