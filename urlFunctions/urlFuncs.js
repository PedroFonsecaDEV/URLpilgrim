const fetch = require("node-fetch");
const ora = require("ora");
const { printLog } = require("../consoleMsg/consoleMsg");

const checkDuplicateUrl = (url, urlArray) => {
  let found = false;

  for (let i = 0; i < urlArray.length; i++) {
    if (urlArray[i] == url) {
      found = true;
      i = urlArray.length + 1;
    }
  }
  return found;
};

const testUrl = async (urlArray) => {
  
  for(const url of urlArray){
    const spinner = ora("URL PILGRIM - Checking URLs Status").start();
    try{ 
    const urlTest = await fetch(url,{method: "head"});
    spinner.stop();   
     if(urlTest.status == 200){
      printLog(`URL: ${url} Status: ${urlTest.status}`, "good");
      }
      else if(urlTest.status == 400 || urlTest.status == 404 ){
      printLog(`URL: ${url} Status: ${urlTest.status}`, "bad");
      }
      else{
      printLog(`URL: ${url} Status: Unknown`, "unknown");
      } 
    }catch (error) {
      spinner.stop(); 
      printLog(`URL: ${url} Status: Unknown`, "unknown");
    } 
    
   };
    
  }
  

module.exports = {
    checkDuplicateUrl,
    testUrl
};
