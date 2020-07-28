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
      const { schedule } = this;
      if (schedule.worker === 'all') {
        this.sendAll(schedule);
      } else if (schedule.worker === 'one') {
        this.sendOne(schedule);
      } else {
        throw new Error(`[egg-rabbitmq] unknow worker type ${schedule.worker}`);
      }
    }
  }

  agent.schedule.use('rabbitmq', RabbitMQStrategy);
};
