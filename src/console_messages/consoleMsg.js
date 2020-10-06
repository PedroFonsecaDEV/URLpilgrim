//This module is responsible for keep the menu messages and print them.

const color = require("cli-color");

//setting colors:
const good =  color.green.bold;
const bad =  color.red.bold; 
const unknown =  color.cyan.bold; 

//---------------------------------

const printLog = (msg, status = color.white) => {
    let color = status;
    if(status == "good") color = good;
    if(status == "bad") color = bad;
    if(status == "unknown") color = unknown;
    console.log(color(msg));
}

const messages = {
    main: `
      URL PILGRIM

      urlpilgrim [${color.blue.bold.underline("target")}] <mode>
      
      target .................. Default mode is set to file(s).

      [${color.blue.bold.underline("empty")}] ................. This page.
      
      -u ...................... Set URL mode. Test or scan the URL(s) target(s).
      
      -v ...................... Display version of URL PILGRIM.
    
      Examples: 
      ${color.blue.bold.underline("test.txt")}................. Read the file, and test all
                                urls found inside it.
      
      ${color.blue.bold.underline("http://example.ca")} -u..... Test the url http://example.ca.

    `
};


module.exports = { printLog, messages };
