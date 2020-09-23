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
  // const testUrl = async (urlArray) => {
  //   const protocolRegex = /^www(.+)/gi;
  //   const spinner = ora("URL PILGRIM - Checking URLs Status").start();
  //   for (let url of urlArray) {
  //     if (protocolRegex.test(url)) {
  //       url = "https://" + url;
  //     }
  
  //     fetch(url, { method: "head" })
  //       .then((urlTest) => {
  //         if (urlTest.status == 200) {
  //           printLog(`URL: ${url} Status: ${urlTest.status}`, "good");
  //         } else if (urlTest.status == 400 || urlTest.status == 404) {
  //           printLog(`URL: ${url} Status: ${urlTest.status}`, "bad");
  //         } else {
  //           printLog(`URL: ${url} Status: Unknown`, "unknown");
  //         }
  //       })
  //       .catch((error) => {
  //         printLog(`URL: ${url} Status: Unknown`, "unknown");
  //       });
  //   }
  //   spinner.stop();
  // };

module.exports = {
    checkDuplicateUrl,
    testUrl
};
