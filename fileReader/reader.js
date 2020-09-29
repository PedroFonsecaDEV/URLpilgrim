const fs = require("fs");
const { testUrl } = require("../urlFunctions/urlFuncs");

urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi;

const initializeStream = async (filePath) => {
  let urlList = [];
  const readStream = fs.createReadStream(filePath);

  readStream.on("data", chunk => {
    const start = Date.now();
   let urls = chunk.toString().toLowerCase().match(urlRegex);
    urlList = Array.from(new Set(urls));
    const duplicates = urls.length - urlList.length;
    console.log("duplicates:", duplicates);
    testUrl(urlList)
    .then(() => {
      const end = Date.now();
      console.log("TIME:", end - start);
    })
  });
  
  readStream.on("end", () => {
    console.log("File read:", filePath);
  });

  readStream.on("error", function (error) {
    console.log("File not found:", filePath);
  });

  

};

module.exports = {
  initializeStream
};
