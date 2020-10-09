const fetch = require("node-fetch");
const { printLog } = require("../console_messages/console-msg");

const testUrl = async (urlArray, filterResult = null) => {
  const protocolRegex = /^www(.+)/gi;
  console.log("urlFUNC:",filterResult);
  for (let url of urlArray) {
    if (protocolRegex.test(url)) {
      url = "https://" + url;
    }

    fetch(url, { method: "head", timeout: 1500 })
    .then((urlTest) => {
      if(filterResult === null){
        if (urlTest.status == 200) printLog(`URL: ${url} Status: 200`, 200);
        else if (urlTest.status == 400 || urlTest.status == 404) printLog(`URL: ${url} Status: 400`, 400);
        else printLog(`URL: ${url} Status: Unknown`, 9999); 
      }
      else {
        // console.log("uTest",urlTest);
        if((urlTest.status == filterResult) || (filterResult == 400 && urlTest.status == 404)) printLog(`URL: ${url} Status: ${filterResult}`, filterResult);
        else if((filterResult == 9999) && urlTest.status != 200 && urlTest.status && 400 && urlTest.status != 404 ) printLog(`URL: ${url} Status: Unknown`, 9999);
      }
    })
    .catch((error) => {
      if(!filterResult)printLog(`URL: ${url} Status: 400`, 400);
    });
  }
};

module.exports = {
  testUrl,
};
