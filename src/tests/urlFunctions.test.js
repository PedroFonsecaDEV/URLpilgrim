const { testUrl } = require('../url_functions');
const { printLog } = require('../console_messages');

const nock = require('nock');
const console_messages = require('../console_messages');

test('testing nock with node-fetch', async () => {
  const host = 'https://www.youtube.com';
  const path = '/';
  nock(host).head(path).reply(200);

  const url = `${host}${path}`;
  const result = await testUrl([url]);
  expect(printLog('URL: https://www.youtube.com/ Status: 200', 200)).toEqual(printLog(expected));
  expect(typeof result).toBe(true);
});
