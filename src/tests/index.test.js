// eslint-disable-next-line import/no-useless-path-segments
const { readFiles } = require('../file_reader/index');

describe('test readFiles function', () => {
  test('passing nothing to function readFiles', () => {
    [null, undefined, {}].forEach((options) => {
      readFiles(options)
        .then((res) => expect(typeof res).toBe(typeof 'String'))
        .catch((error) => console.log(error));
    });
  });
  // test('passing an invalid file path to function readFiles'),
  //   () => {
  //     readFiles();
  //   };
});

// expect(() => readFiles(options)).rejects.toThrow();
