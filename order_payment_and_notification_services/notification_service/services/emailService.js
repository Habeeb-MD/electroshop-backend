const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});
const sendEmail = async (
  recipientEmail = process.env.RECEIVER_EMAIL,
  subject,
  content,
) => {
  try {
    const response = await mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
      from: process.env.SENDER_EMAIL, // Use verified Mailgun email address
      to: recipientEmail,
      subject,
      html: content,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendEmail,
};
