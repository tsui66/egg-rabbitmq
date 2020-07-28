'use strict';

const rabbitmq = require('./lib/rabbitmq');

module.exports = agent => {
  agent.logger.info('[egg-rabbitmq] plugin init');

  const config = agent.config.rabbitmq;
  if (config.agent) {
    rabbitmq(agent);
  }

  class RabbitMQStrategy extends agent.ScheduleStrategy {
    start() {
      const { schedule: { client, queue: queueName, worker } } = this;
      if (worker === 'all') {
        this.sendAll({ queueName, client });
      } else if (worker === 'one') {
        this.sendOne({ queueName, client });
      } else {
        throw new Error(`[egg-rabbitmq] unknow worker type ${worker}`);
      }
    }
  }

  agent.schedule.use('rabbitmq', RabbitMQStrategy);
};
