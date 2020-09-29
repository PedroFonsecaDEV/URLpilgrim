const fs = require("fs");
const readLine = require("readline");
const { checkDuplicateUrl } = require("../urlFunctions/urlFuncs");
const { appState } = require("../state/appState");
const { type } = require("os");
let { urlList, tempData, urlRegex } = appState;

const initializeStream = (filePath) => {
  const readStream = fs.createReadStream(filePath);

  readStream.on("data", chunk => {
   let urls = chunk.toString().match(urlRegex);
    console.log("2",urls);
  });
  
  readStream.on("end", () => {
    console.log("End of the file", filePath);
  });

  readStream.on("error", function (error) {
    console.log("URLpilgrim: Could not find the file:", filePath);
  });

  
  
  
  // const fileStream = readLine.createInterface({
  //   input: readStream
  // });
};

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
