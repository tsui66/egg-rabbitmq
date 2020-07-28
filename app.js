'use strict';

const rabbitmq = require('./lib/rabbitmq');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    const { app } = this;
    if (app.config.rabbitmq.app) {
      rabbitmq(app);
    }
  }

  // async didReady() {}
}

module.exports = AppBootHook;
