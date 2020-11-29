/* eslint-disable */
const { readFiles } = require('../../file_reader/index');

jest.mock('fs');
const fs = require('fs').promises;
const filename = 'file';
const fileData = 'http://test.com.br/ abc';

beforeAll(() => {
  fs.__setMockFileData(filename, fileData);
});

describe('test readFiles function - INPUT and OUTPUTS', () => {
  test('passing nothing to function readFiles - EXPECT ERROR MESSAGE', async () => {
    await expect(readFiles(null)).rejects.toThrow('unknown filepath');
  });

  test('passing nothing to function readFiles - EXPECT ERROR MESSAGE', async () => {
    await expect(readFiles({})).rejects.toThrow('unknown filepath');
  });

  test('passing nothing to function readFiles - EXPECT ERROR MESSAGE', async () => {
    await expect(readFiles([])).rejects.toThrow('unknown filepath');
  });

  test('an invalid path should throw', async () => {
    await expect(readFiles('wrongFile.txt')).rejects.toThrow('unknown filepath');
  });

  test('reading an existing file should work', async () => {
    const result = await readFiles(filename);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toEqual('http://test.com.br/');
  });
});
