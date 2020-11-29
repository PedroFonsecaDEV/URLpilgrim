/* eslint-disable */
const run = require('./run');

describe('e2e test urlpilgrim', () => {
  test('prints error and help message when no arguments given', async () => {
    const { stderr, stdout, exitCode } = await run();
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });

  test('urlpilgirim running file url_test2.txt', async () => {
    const { stderr, stdout, exitCode } = await run('url_test2.txt');
    expect(exitCode).toBe(1);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });

  test('urlpilgirim running file url_test2.txt - JUST GOOD URLS', async () => {
    const { stderr, stdout, exitCode } = await run('url_test2.txt', '--good');
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });

  test('urlpilgirim running file url_test2.txt - JUST BAD URLS', async () => {
    const { stderr, stdout, exitCode } = await run('url_test2.txt', '--bad');
    expect(exitCode).toBe(1);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });

  test('urlpilgirim running file url_test2.txt - JUST UNK URLS', async () => {
    const { stderr, stdout, exitCode } = await run('url_test2.txt', '--unk');
    expect(exitCode).toBe(1);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });

  test('urlpilgirim running file url_test2.txt json output', async () => {
    const { stderr, stdout, exitCode } = await run('url_test2.txt', '-j');
    expect(exitCode).toBe(1);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });
});
