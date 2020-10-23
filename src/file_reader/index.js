const { line } = require("cli-color/erase");
const fs = require("fs");
const readLine = require("readline");
const { checkDuplicateUrl } = require("../url_functions");

const readFiles = async (fileToExtractUrls, fileToIgnoreUrls = null) => {
  
  const urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi;

  const protocolRegex = /^www(.+)/gi;
  
  let urlList = [];
  
  const data = await fs.promises.readFile(fileToExtractUrls, "utf8");

  urlList = data.toLowerCase().match(urlRegex);
  urlList = Array.from(new Set(urlList));

  if(fileToIgnoreUrls) {
    let urlsToIgnore = await fs.promises.readFile(fileToIgnoreUrls, "utf-8");
    
    const regexIgnoreUrls = /^(https:\/\/|http:\/\/|#)([\w+\-&@`~#$%^*.=\/?: ]*)/im;

    urlsToIgnore = urlsToIgnore.split('\n');

    let validFile = 0;
    let listToIgnore = [];

    for(let line of urlsToIgnore) {
      validFile = (regexIgnoreUrls.test(line)) ? validFile : ++validFile;
      line.toLowerCase();
      line.match(urlRegex) ? listToIgnore.push(line) : null;
    }

    if(validFile != 0) throw "Invalid Ignore file." 
    listToIgnore = Array.from(new Set(listToIgnore));
  
    urlList = urlList.reduce((finalUrls, url) => {
      if (protocolRegex.test(url)) url = "https://" + url;
      if (!listToIgnore.some((ignoreUrl) => url.includes(ignoreUrl))) finalUrls.push(url);
      return finalUrls
    },[]);
  }

  return urlList; 
};

module.exports = {
  readFiles
};
