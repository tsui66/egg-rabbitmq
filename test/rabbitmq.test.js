'use strict';

const mock = require('egg-mock');

describe('test/rabbitmq.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/rabbitmq-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);
  // 基本路由测试
  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, rabbitmq')
      .expect(200);
  });
  // 生产者测试
  it('should publish message', () => {
    return app
      .httpRequest()
      .get('/publish')
      .query({ msg: 'hello world' })
      .expect('true')
      .expect(200);
  });
  // 消费者测试
  it('should consume message', () => {
    return app
      .httpRequest()
      .get('/consume')
      .expect({ msg: 'hello world' })
      .expect(200);
  });
});
