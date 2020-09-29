const fetch = require("node-fetch");
const { printLog } = require("../consoleMsg/consoleMsg");

const testUrl = async (urlArray) => {
  console.log("TEST URL");
  const protocolRegex = /^www(.+)/gi;
  let good = 0;
  let bad = 0;
  let unk = 0;

  for(let url of urlArray){
    
    if(protocolRegex.test(url)){
      url = "https://" + url; 
    }

    try{ 
    const urlTest = await fetch(url,{method: "head", timeout: 1500});   
     if(urlTest.status == 200){
      good++;
      printLog(`URL: ${url} Status: ${urlTest.status}`, "good");
      }
      else if(urlTest.status == 400 || urlTest.status == 404 ){
      bad++;
      printLog(`URL: ${url} Status: ${urlTest.status}`, "bad");
      }
      else{
      unk++;
      printLog(`URL: ${url} Status: Unknown`, "unknown");
      } 
    }catch (error) {
      bad++;
      printLog(`URL: ${url} Status: 404`, "bad");
    } 
    
   };
   console.log("GOOD:", good, "BAD:", bad, "UNKNOWN:", unk);
    
  }

module.exports = {
    testUrl
};
