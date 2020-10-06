const fs = require("fs");
const readLine = require("readline");
const { checkDuplicateUrl } = require("../url_functions/url-funcs");
const { appState } = require("../state/app-state");
let { urlList, tempData, urlRegex } = appState;

const initializeStream = (filePath) =>
  new Promise((resolve, reject) => { 
    const readStream = fs.createReadStream(filePath);
    
    readStream.on('error', function (err) {
      reject();
    });

    const fileStream = readLine.createInterface({
      input: readStream
    });
    
    resolve(fileStream);
  });

const readFile = (fileStream) =>
  new Promise((resolve, reject) => {
    if (fileStream) {
      fileStream.on("line", (input) => {
        while ((tempData = urlRegex.exec(input)) !== null) {
          let urlFromText = tempData[0].trim();
          if (!checkDuplicateUrl(urlFromText, urlList)) {
            urlList.push(tempData[0]);
          }
        }
        resolve();
      });
    }
  });

module.exports = {
  initializeStream,
  readFile,
};
