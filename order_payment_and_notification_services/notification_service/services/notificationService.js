const { Notification, Template } = require("../models");
const { getChannel } = require("../config/rabbitMQ");
const emailService = require("./emailService");
const fs = require("fs/promises");
const path = require("node:path");

const QUEUE_NAME = "notification_queue";

const sendNotification = async (
  userId,
  recipientEmail,
  templateId,
  subject,
  data,
) => {
  try {
    const channel = await getChannel();
    const msg = JSON.stringify({
      userId,
      recipientEmail,
      templateId,
      subject,
      data,
    });

    channel.sendToQueue(QUEUE_NAME, Buffer.from(msg));
    console.log("Sent message", msg);
  } catch (error) {
    console.error("Failed to send notification:", error.message);
  }
};

const consumeNotifications = async () => {
  const channel = await getChannel();

  channel.consume(
    QUEUE_NAME,
    async (msg) => {
      console.log("Received message", msg.content.toString());
      const { userId, recipientEmail, templateId, subject, data } = JSON.parse(
        msg.content.toString(),
      );

      let notification;
      try {
        let content = "";
        if (templateId === 0) {
          const templatePath = path.join(
            __dirname,
            "../",
            "templates",
            "forgotPasswordTemplate.html",
          );
          content = await fs.readFile(templatePath, "utf8");
        } else if (templateId === 1) {
          const templatePath = path.join(
            __dirname,
            "../",
            "templates",
            "transactionCompleted.html",
          );
          content = await fs.readFile(templatePath, "utf8");
        } else {
          const template = await Template.findByPk(templateId);
          if (!template) {
            console.log("Template not found");
            return;
          }
          content = template.content;
        }
        content = content.replace("{{ year }}", new Date().getFullYear());

        for (const key in data) {
          content = content.replace(
            new RegExp("{{ " + key + " }}", "g"),
            data[key],
          );
        }

        notification = await Notification.create({
          user_id: userId,
          content,
          status: "pending",
        });
        await emailService.sendEmail(recipientEmail, subject, content);

        await notification.update({ status: "sent" });
      } catch (error) {
        console.error("Failed to process notification:", error.message);
        if (notification) {
          await notification.update({ status: "failed" });
        }
      }
    },
    { noAck: true },
  );
};

module.exports = {
  sendNotification,
  consumeNotifications,
};
