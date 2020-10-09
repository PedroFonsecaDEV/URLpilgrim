const minimist = require("minimist");
const { testUrl, testSingleUrl } = require("./url_functions/url-funcs");
const { initializeStream, readFile } = require("./file_reader/readers");
const { printLog, messages } = require("./console_messages/console-msg");

module.exports.main = () => {

  const args = minimist(process.argv.slice(2));
  const filesToRead = args._;
  delete args._;
  console.log("args:", args);

  if(args.v){
    printLog("URL PILGRIM v.0.1","good");
  }
  else if(args.u){
    testUrl(filesToRead);
  }
  else if(filesToRead.length == 0) {
    printLog(messages.main, "good");
  }
  else if(args.bad || args.good || args.unk) {
    console.log("ARGS", args);
    let filterResult = args.bad ? 400 : 200;
    filterResult = args.unk ? 9999 : filterResult;

    console.log("filter:",filterResult);

    for(const file of filesToRead){
      initializeStream(file)
      .then(data => testUrl(data, filterResult))
      .catch(() => console.log("Error: Please provide a path to a file."));
    } 
  }
  else if(Object.keys(args).length === 0) {
    for(const file of filesToRead){
      initializeStream(file)
      .then(data => testUrl(data))
      .catch(() => console.log("Error: Please provide a path to a file."));
    }
  }
};