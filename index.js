const minimist = require("minimist");

module.exports= () => {
    const args = minimist(process.argv.slice(2));
    const cmd = args._[0];
    console.log("cm:", cmd);
    console.log("ar:", args);

   
}
