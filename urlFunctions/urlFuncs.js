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

//   zg3d commented 23 hours ago
// This is just an option but the async await is much slower the .then().catch
// but you can turn your await fetch to fetch().then.catch()

// It will be a fire and forget it method and is much quicker, I have forked your repo and shown a potential option to quicken checking links
// https://github.com/zg3d/URLpilgrim/blob/master/urlFunctions/urlFuncs.js#L17-L40

// The downfall is that you Ora spinner won't work anymore but we can find a potential fix to it.
// The above method quicken the tool by a great margin and might be a great addition.

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
