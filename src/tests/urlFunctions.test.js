const { testUrl } = require('../url_functions');

const nock = require('nock');
const originalConsolelog = global.console.log;

describe('url module -> testUrl', () => {
  let logOutput = null;

  function testLogFn(...args) {
    logOutput = logOutput || [];
    args.forEach((arg) => logOutput.push(arg));
  }

  function finalize(output) {
    if (output && Array.isArray(output)) {
      return output.join('');
    }
    return output;
  }

  beforeEach(() => {
    global.console.log = testLogFn;
    logOutput = null;
  });

  afterEach(() => {
    global.console.log = originalConsolelog;
    logOutput = null;
  });

  test('testing nock with node-fetch', async () => {
    const host = 'https://www.youtube.com';
    const path = '/';
    nock(host).head(path).reply(200);

    const url = `${host}${path}`;
    testUrl([url]);
    const expected = 'URL: https://www.youtube.com/ Status: 200';

    expect(finalize(logOutput)).toEqual(expected);
  });
});
