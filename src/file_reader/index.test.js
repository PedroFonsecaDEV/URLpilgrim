// eslint-disable-next-line import/no-useless-path-segments
const { readFiles } = require('../file_reader');

function sum(a, b) {
  return a + b;
}

describe('test readFiles function', () => {
  function checkOutput(output, optionSent) {
    expect(Array.isArray(output)).toBe('true');
  }

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
