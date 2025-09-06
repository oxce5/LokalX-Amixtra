const amqp = require('amqplib');
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@localhost:5672';
const QUEUE = process.env.RABBIT_QUEUE || 'user-events';

let rabbitChannel = null;

async function setupRabbit() {
  try {
    const conn = await amqp.connect(RABBIT_URL);
    rabbitChannel = await conn.createChannel();
    await rabbitChannel.assertQueue(QUEUE);
    console.log('[RabbitMQ] Connected and queue asserted:', QUEUE);
  } catch (err) {
    console.error('[RabbitMQ] Connection failed:', err);
  }
}

setupRabbit();

module.exports = {
  getRabbitChannel: () => rabbitChannel,
  QUEUE,
};
