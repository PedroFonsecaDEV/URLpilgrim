const minimist = require("minimist");
const { testUrl, testSingleUrl } = require("./url_functions/url-funcs");
const { appState } = require("./state/app-state");
const { initializeStream, readFile } = require("./file_reader/readers");
const { printLog, messages } = require("./console_messages/console-msg");


module.exports.main = () => {
  
  let { urlList } = appState;  
  
  const args = minimist(process.argv.slice(2));
  const filesToRead = args._;
  delete args._;

  if(args.v){
    printLog("URL PILGRIM v.0.1","good");
  }
  else if(args.u){
    testUrl(filesToRead);
  }
  else if(filesToRead.length == 0) {
    printLog(messages.main, "good");
  }
  else {
    for(const file of filesToRead){
      initializeStream(file)
      .then(data => readFile(data))
      .then(() => testUrl(urlList))
      .catch((error) => console.log("Error: Please provide a path to a file."));
  }
} 
};
