const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client
  .connect()
  .then(() => console.log("Connected to the redis server..."))
  .catch(console.error);

client.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = client;
