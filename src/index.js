const minimist = require("minimist");
const { testUrl, testSingleUrl } = require("./url_functions");
const { readFiles, readFile } = require("./file_reader");
const { printLog, messages } = require("./console_messages");

module.exports.main = () => {

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
  else if(args.bad || args.good || args.unk) {
    let filterResult = args.bad ? 400 : 200;
    filterResult = args.unk ? 9999 : filterResult;
    let displayJson = false;
    if(args.j || args.json) displayJson = true;
    for(const file of filesToRead){
      readFiles(file)
      .then(data => testUrl(data, filterResult, displayJson))
      .catch(() => console.log("Error: Please provide a path to a file."));
    } 
  }
  else if(Object.keys(args).length === 0 || args.j || args.json ) {
    let displayJson = false;
    if(args.j || args.json) displayJson = true;
    for(const file of filesToRead){
      readFiles(file)
      .then(data => testUrl(data,null,displayJson))
      .catch(() => console.log("Error: Please provide a path to a file."));
    }
  }
};