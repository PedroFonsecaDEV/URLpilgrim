// eslint-disable-next-line import/no-useless-path-segments
const { readFiles } = require('../file_reader/index');

jest.mock('fs');
const fs = require('fs').promises;

describe('test readFiles function - INPUT and OUTPUTS', () => {
  test('passing nothing to function readFiles - EXPECT ERROR MESSAGE', () => {
    [null, undefined, {}, []].forEach((options) => {
      readFiles(options).then((res) => expect(res).toBe('readFile function failed'));
    });
  });

  test('passing nothing to function readFiles - EXPECT THROW', () => {
    [null, undefined, {}, []].forEach((options) => {
      expect(() => readFiles(options)).rejects.toThrow();
    });
  });
});
//everything is passing (review)
describe('test readFiles function receiving PATHS', () => {
  test('relative file path should return an Array(file names)', () => {
    ['abc.txt', 'a bc.txt'].forEach((file) => {
      readFiles(file).then((res) => expect(Array.isArray(res)).toBe(true));
    });
  });

  test('absolute Unix file path should return an Array', () => {
    const path = '/abc';
    readFiles(path).then((res) => expect(Array.isArray(res)).toBe(true));
  });

  test('absolute Windows file path should return an Array', () => {
    const path = 'C://abc';
    readFiles(path).then((res) => expect(Array.isArray(res)).toBe(true));
  });
});

describe('read tests', () => {
  const filename = 'file';
  const fileData = 'http://test.com.br/ abc';

  beforeAll(() => {
    fs.__setMockFileData(filename, fileData);
  });

  test('an invalid path should throw', async () => {
    expect(() => readFiles(null)).rejects.toThrow();
  });

  //review this test (not working - everything is passing)
  test('reading an existing file should work', () => {
    readFiles(filename).then((res) => {
      expect(res[0]).toEqual('http://test.com.br/');
    });
  });

  //review this test (not working - everything is passing(valid or invalid file))
  test('reading a non-existing file should throw', async () => {
    expect(() => readFiles('invalid')).rejects.toThrow();
  });
});

//how to reject using an async function ?
// 1 return new Error ("message")?
// 2 return Promise.reject(new Error("unknown filepath")); ?
// 3 return "Message error" ?
