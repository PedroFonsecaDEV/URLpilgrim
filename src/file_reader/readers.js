const fs = require("fs");
const readLine = require("readline");
const { checkDuplicateUrl } = require("../url_functions/url-funcs");

const initializeStream = async (filePath) => {
  
  const urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi;
  let urlList = [];
  
  const data = fs.readFileSync(filePath, "utf8");
    
  urlList = data.toLowerCase().match(urlRegex);
  urlList = Array.from(new Set(urlList));
  console.log("readExtract:",urlList);
  return urlList; 

  console.log("reader...error!");

};

module.exports = {
  initializeStream
};
