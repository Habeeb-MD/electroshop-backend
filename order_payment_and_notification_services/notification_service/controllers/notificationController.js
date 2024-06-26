const notificationService = require("../services/notificationService");
const catchAsync = require("../utils/catchAsync");

const sendNotification = catchAsync(async (req, res) => {
  const { userId, recipientEmail, templateId, subject, data } = req.body;

  try {
    await notificationService.sendNotification(
      userId,
      recipientEmail,
      templateId,
      subject,
      data,
    );
    res.status(200).json({ message: "Notification request sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  sendNotification,
};
