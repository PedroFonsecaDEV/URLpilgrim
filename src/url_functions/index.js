const fetch = require("node-fetch");
const { printLog } = require("../console_messages");

const testUrl = (urlArray, testMethod = null) => {

  if(testMethod.filterStatus != 200) process.exitCode = 1;
  
  const fetchUrl = async(url) => {
    
    const protocolRegex = /^www(.+)/gi;
    
    if (protocolRegex.test(url)) {
      url = "https://" + url;
    }
    
    try {
    const urlResult = await fetch(url, { method: "head", timeout: 1500 });
    return {url: url, status: urlResult.status};
    } 
    catch (error) {
      return {url: url, status: 400};
    }
  };

  const urlPromises = urlArray.map(fetchUrl);
  Promise.all(urlPromises)
  .then(finalResults => finalResults.map(urlTest => {
    if(!testMethod.filterStatus){
      
      if (urlTest.status == 200){
        printLog(`URL: ${urlTest.url} Status: 200`, 200);
        return urlTest;
      } 
      else if (urlTest.status == 400 || urlTest.status == 404) {
        process.exitCode = 1;
        printLog(`URL: ${urlTest.url} Status: 400`, 400);
        return urlTest;
      }
      else { 
        process.exitCode = 1;
        printLog(`URL: ${urlTest.url} Status: Unknown`, 9999);
        return urlTest;
      }
    }
    else {
      if((urlTest.status == testMethod.filterStatus) || (testMethod.filterStatus == 400 && urlTest.status == 404)) {
        printLog(`URL: ${urlTest.url} Status: ${testMethod.filterStatus}`, testMethod.filterStatus);
        return urlTest;
      }
      else if((testMethod.filterStatus == 9999) && urlTest.status != 200 && urlTest.status != 400 && urlTest.status != 404 ){
        printLog(`URL: ${urlTest.url} Status: Unknown`, 9999);
        return urlTest;
      } 
    }
  }))
  .then((results) => {
    if(testMethod.output) {
    console.log("FINAL RESULT JSON:");
    console.log(JSON.stringify(results.filter(urlObj => urlObj != null)));
    }
  })
  .catch((urlObj) => {
    process.exitCode = 1;
    if(!testMethod.filterStatus)printLog(`URL: ${urlObj.url} Status: 400`, 400);
  });
};
    

module.exports = {
  testUrl
};