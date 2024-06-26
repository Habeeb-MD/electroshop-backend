const amqp = require("amqplib");

let connection = null;
let channel = null;
const QUEUE_NAME = "notification_queue";

const initializeRabbitMQ = async () => {
  if (connection && channel) {
    return { connection, channel };
  }

  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log("RabbitMQ initialized");
    return { connection, channel };
  } catch (error) {
    console.error("Failed to initialize RabbitMQ:", error.message);
    process.exit(1);
  }
};

const getChannel = async () => {
  return channel;
};

module.exports = {
  initializeRabbitMQ,
  getChannel,
};
