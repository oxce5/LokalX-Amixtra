// Uncomment and configure if you use RabbitMQ
// const amqp = require('amqplib');
// const RABBIT_URL = process.env.RABBIT_URL || 'amqp://user:pass@localhost:5672';
// const QUEUE = process.env.RABBIT_QUEUE || 'user-events';
// let rabbitChannel = null;
// async function setupRabbit() {
//   const conn = await amqp.connect(RABBIT_URL);
//   rabbitChannel = await conn.createChannel();
//   await rabbitChannel.assertQueue(QUEUE);
// }
// setupRabbit().catch(console.error);
// module.exports = { rabbitChannel, QUEUE };

module.exports = { rabbitChannel: null, QUEUE: null };
