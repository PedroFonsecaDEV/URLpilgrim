const minimist = require("minimist");
const fs = require("fs");
const readLine = require("readline"); 
 
module.exports= () => {
    const args = minimist(process.argv.slice(2));
    const cmd = args._[0];
    console.log("cm:", cmd);
    console.log("ar:", args);

    // const urlRegex = new RegExp("(http|https)(:\\/\\/)([\\w+\\-&@`~#$%^*.=/?:]*)(\\s)", "ig");
    const urlRegex = /(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]*)/gi;
    
    const fileStream = readLine.createInterface({ 
        input: fs.createReadStream("1.html"), 
        output: null,
        terminal: false
    }); 
    
    let urlList = [];
    let iterator = [];
    let counter = 0;

    // urlList = urlRegex.exec("http://s9y.org");
    // console.log("r", urlList);

    
    fileStream.on('line', (input) => {
        
        while ((iterator = urlRegex.exec(input)) !== null) {
            let msg = 'Found ' + iterator[0] + '. ';
            msg += 'Next match starts at ' + urlRegex.lastIndex;
            console.log(msg);
            counter++;
            urlList.push(iterator);
        }
        
        
      });
  
    

    

    setTimeout(() => console.log(counter), 10000);

    

}
