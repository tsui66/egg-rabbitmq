'use strict';

const rabbitmq = require('./lib/rabbitmq');

module.exports = agent => {
  agent.logger.info('[egg-rabbitmq] plugin init');

  const config = agent.config.rabbitmq;
  if (config.agent) {
    rabbitmq(agent);
  }

  class RabbitMQStrategy extends agent.ScheduleStrategy {
    async start() {
      const { schedule: { exchange, queue: queueName, worker } } = this;
      const ch = await agent.rabbitmq.createChannel();
      await ch.assertExchange(exchange, 'direct', {
        durable: false,
      });
      const _queueName = queueName || agent.config.rabbitmq.queueName;
      await ch.assertQueue(_queueName, { durable: false });
      ch.consume(_queueName, msg => {
        if (worker === 'all') {
          this.sendAll({ schedule: this.schedule, msg, ackEvent: 'rabbitmq_ack' });
        } else if (worker === 'one') {
          this.sendOne({ schedule: this.schedule, msg, ackEvent: 'rabbitmq_ack' });
        } else {
          throw new Error(`[egg-rabbitmq] unknow worker type ${worker}`);
        }
      });
      agent.messenger.on('rabbitmq_ack', payload => {
        if (payload && payload.emitter) {
          agent.messenger.sendToApp(payload.emitter, payload.data || {});
        }
        ch.ack(payload.msg);
      });
    }
  }

  agent.schedule.use('rabbitmq', RabbitMQStrategy);
};
