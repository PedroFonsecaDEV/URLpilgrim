const minimist = require('minimist');
const { testUrl } = require('./url_functions');
const { readFiles } = require('./file_reader');
const { printLog, messages } = require('./console_messages');
const { lastPosts, buildUrls, readUrls } = require('./read_url_functions');

module.exports.main = () => {
  const args = minimist(process.argv.slice(2));
  const filesToRead = args._;

  if (args.v) {
    printLog('URL PILGRIM v.0.1', 'good');
  } else if (args.u) {
    testUrl(args.u);
  } else if (filesToRead.length === 0) {
    printLog(messages.main, 'good');
  } else {
    const testMethod = {};

    if (args.bad || args.good || args.unk) {
      let filterResult = args.bad ? 400 : 200;
      filterResult = args.unk ? 9999 : filterResult;
      testMethod.filterStatus = filterResult;
    }

    testMethod.output = args.j || args.json;

    testMethod.ignore = args.i || args.ignore;

    filesToRead.forEach((file) => {
      readFiles(file, testMethod.ignore)
        .then((data) => testUrl(data, testMethod))
        .catch(() => {
          console.log('Error: Please provide a path to a file.');
          process.exit(1);
        });
    });
  }
};
