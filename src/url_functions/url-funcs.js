const fetch = require("node-fetch");
const { printLog } = require("../console_messages/console-msg");

const testUrl = (urlArray, filterResult = null, output = false) => {
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
    if(filterResult === null){
      if (urlTest.status == 200){
        printLog(`URL: ${urlTest.url} Status: 200`, 200);
        return urlTest;
      } 
      else if (urlTest.status == 400 || urlTest.status == 404) {
        printLog(`URL: ${urlTest.url} Status: 400`, 400);
        return urlTest;
      }
      else { 
        printLog(`URL: ${urlTest.url} Status: Unknown`, 9999);
        return urlTest;
      }
    }
    else {
      if((urlTest.status == filterResult) || (filterResult == 400 && urlTest.status == 404)) {
        printLog(`URL: ${urlTest.url} Status: ${filterResult}`, filterResult);
        return urlTest;
      }
      else if((filterResult == 9999) && urlTest.status != 200 && urlTest.status != 400 && urlTest.status != 404 ){
        printLog(`URL: ${urlTest.url} Status: Unknown`, 9999);
        return urlTest;
      } 
    }
  }))
  .then((results) => {
    if(output) {
    console.log("FINAL RESULT JSON:");
    console.log(JSON.stringify(results.filter(urlObj => urlObj != null)));
    }
  })
  .catch((urlObj) => {
    console.log(urlObj);
    if(!filterResult)printLog(`URL: ${urlObj.url} Status: 400`, 400);
  });
};
    

module.exports = {
  testUrl
};
