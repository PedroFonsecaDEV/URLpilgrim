const { testUrl } = require('../../url_functions');
const color = require('cli-color');
const nock = require('nock');
let { printLog } = require('../../console_messages');

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

  test('testing status 200', async () => {
    const host = 'https://www.youtube.com';
    const path = '/';
    nock(host).head(path).reply(200);

    const url = `${host}${path}`;
    await testUrl([url]);
    const expected = color.green.bold('URL: https://www.youtube.com/ Status: 200');

    expect(finalize(logOutput)).toEqual(expected);
  });

  test('testing status 400 and next promise should work', async () => {
    const host = 'https://www.youtube.com';
    const path = '/';
    const url = `${host}${path}`;
    const expected = [{"status": 400, "url": "https://www.youtube.com/"}];
    const results = await testUrl([url]);  
    expect(results).toEqual(expected);
  });

  test('testing when throwing error', async () => {
    const host = 'https://www.youtube.com';
    const path = '/';
    const url = `${host}${path}`;
    const expected = [{"status": 400, "url": "https://www.youtube.com/"}];
    printLog = jest.fn();
    printLog.mockImplementation(() => { throw new Error({"status": 400, "url": "https://www.youtube.com/"})});
    const results = await testUrl([url]);  
    expect(results).toEqual(expected);
  });

  test('testing status 400', async () => {
    const host = 'https://www.youtube.com';
    const path = '/';
    nock(host).head(path).reply(400);

    const url = `${host}${path}`;
    await testUrl([url]);
    const expected = color.red.bold('URL: https://www.youtube.com/ Status: 400');

    expect(finalize(logOutput)).toEqual(expected);
  });

  test('testing status UNK', async () => {
    const host = 'https://www.youtube.com';
    const path = '/';
    nock(host).head(path).reply(504);

    const url = `${host}${path}`;
    await testUrl([url]);
    const expected = color.cyan.bold('URL: https://www.youtube.com/ Status: Unknown');

    expect(finalize(logOutput)).toEqual(expected);
  });
});
