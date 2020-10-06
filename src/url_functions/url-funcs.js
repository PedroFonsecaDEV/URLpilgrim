const fetch = require("node-fetch");
const ora = require("ora");
const { printLog } = require("../console_messages/console-msg");

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
  const protocolRegex = /^www(.+)/gi

  for(let url of urlArray){
    
    if(protocolRegex.test(url)){
      url = "https://" + url; 
    }

    const spinner = ora("URL PILGRIM - Checking URLs Status").start();
    try{ 
    const urlTest = await fetch(url,{method: "head", timeout: 1500});
    spinner.stop();   
     if(urlTest.status == 200){
      printLog(`URL: ${url} Status: GOOD`, "good");
      }
      else if(urlTest.status == 400 || urlTest.status == 404 ){
      printLog(`URL: ${url} Status: BAD`, "bad");
      }
      else{
      printLog(`URL: ${url} Status: Unknown`, "unknown");
      } 
    }catch (error) {
      spinner.stop(); 
      printLog(`URL: ${url} Status: BAD`, "bad");
      
    } 
    
   };
    
  }
  

module.exports = {
    checkDuplicateUrl,
    testUrl
};
