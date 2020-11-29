/* eslint-disable */
const fs = jest.createMockFromModule('fs');

// Allow adding a mock file with data to our fake filesystem
const mockFsMemory = {};
function __setMockFileData(filename, data) {
  mockFsMemory[filename] = data;
}

// A custom version of `readFile` that reads from our
// mock file data vs. the real filesystem
function readFile(filepath) {
  const data = mockFsMemory[filepath];

  if (data) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(new Error('unknown filepath'));
  }
}

// Expose this on `.promises`, which is where we use it
fs.promises = {
  __setMockFileData,
  readFile,
};

module.exports = fs;
