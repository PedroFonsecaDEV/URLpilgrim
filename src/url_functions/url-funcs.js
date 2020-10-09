const fetch = require("node-fetch");
const ora = require("ora");
const { printLog } = require("../console_messages/console-msg");

const testUrl = async (urlArray) => {
  const protocolRegex = /^www(.+)/gi;

  for (let url of urlArray) {
    if (protocolRegex.test(url)) {
      url = "https://" + url;
    }

    fetch(url, { method: "head", timeout: 1500 })
      .then((urlTest) => {
        if (urlTest.status == 200) {
          printLog(`URL: ${url} Status: GOOD`, "good");
        } else if (urlTest.status == 400 || urlTest.status == 404) {
          printLog(`URL: ${url} Status: BAD`, "bad");
        } else {
          printLog(`URL: ${url} Status: Unknown`, "unknown");
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
