const fs = require("fs");
const readLine = require("readline");
const { checkDuplicateUrl } = require("../url_functions");

const readFiles = async (filePath) => {
  
  const urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi;
  let urlList = [];
  
  const data = await fs.promises.readFile(filePath, "utf8");

  urlList = data.toLowerCase().match(urlRegex);
  urlList = Array.from(new Set(urlList));
  return urlList; 
};

module.exports = {
  readFiles
};
