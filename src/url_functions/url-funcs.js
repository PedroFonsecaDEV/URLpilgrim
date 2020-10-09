const fetch = require("node-fetch");
const { printLog } = require("../console_messages/console-msg");

const testUrl = async (urlArray, filterResult = null) => {
  const protocolRegex = /^www(.+)/gi;

  for (let url of urlArray) {
    if (protocolRegex.test(url)) {
      url = "https://" + url;
    }

    fetch(url, { method: "head", timeout: 1500 })
    .then((urlTest) => {
      if(filterResult === null){
        if (urlTest.status == 200) {
          printLog(`URL: ${url} Status: 200`, "good");
        } else if (urlTest.status == 400 || urlTest.status == 404) {
          printLog(`URL: ${url} Status: 400`, "bad");
        } else {
          printLog(`URL: ${url} Status: Unknown`, "unknown");
        }
      }
      else {
        console.log("ELSE URL");
        if(urlTest.status == filterResult) printLog(`URL: ${url} Status: ${filterResult}`, filterResult);
      }
    })
    .catch((error) => {
      printLog(`URL: ${url} Status: BAD`, "bad");
    });
  }
};

module.exports = {
  testUrl,
};
