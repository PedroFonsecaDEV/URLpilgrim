// This module is responsible for keep the menu messages and print them.

const color = require('cli-color');

const printLog = (msg, status) => {
  let paint = color.white;
  if (status === 200) paint = color.green.bold;
  if (status === 400) paint = color.red.bold;
  if (status === 9999) paint = color.cyan.bold;
  console.log(paint(msg));
};

const messages = {
  main: `
      URL PILGRIM

      urlpilgrim [${color.blue.bold.underline('target')}] <mode>
      
      target .................. Default mode is set to file(s).

      [${color.blue.bold.underline('empty')}] ................. This page.
      
      -u ...................... Set URL mode. Test or scan the URL(s) target(s).
      
      -v ...................... Display version of URL PILGRIM.

      -i ...................... Ignore URLs found in a file.

      -j --json ............... Display a JSON with the results of the test.
    
      Examples: 
      urlpilgrim ${color.blue.bold.underline(
        'test.txt'
      )}....................... Read the file, and test all
                                                        urls found inside it.
      
      urlpilgrim ${color.blue.bold.underline(
        'http://example.ca'
      )} -u..... Test the url http://example.ca.

      urlpilgrim ${color.blue.bold.underline(
        'test.txt ignore.txt -i'
      )}....................... Read the file, and test all
                                urls found inside it ignoring all urls found in ignore.txt.
      
      urlpilgrim ${color.blue.bold.underline(
        'test.txt --good'
      )}....................... Read the file, and test all
                                     urls found inside it. Display only status 200 (good).

    `,
};

module.exports = { printLog, messages };
