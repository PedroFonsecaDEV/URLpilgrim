const minimist = require("minimist");
const { testUrl } = require("./urlFunctions/urlFuncs");
const { initializeStream } = require("./fileReader/reader");
const { printLog, messages } = require("./consoleMsg/consoleMsg");

module.exports.main = () => {
  const args = minimist(process.argv.slice(2));
  const filesToRead = args._;
  delete args._;

  if (args.v) {
    printLog("URL PILGRIM v.0.1", "good");
    return;
  } 
  else if (args.u) {
    testUrl(filesToRead);
    return;
  } 
  else if (filesToRead.length == 0) {
    printLog(messages.main, "good");
    return;
  } 
  else {
    for (const file of filesToRead) {
      initializeStream(file);
    }
    return;
  }
};
