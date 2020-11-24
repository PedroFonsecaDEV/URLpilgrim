const fs = require('fs');

const readFiles = async (fileToExtractUrls, fileToIgnoreUrls = null) => {
  const urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi;

  const protocolRegex = /^www(.+)/gi;

  let urlList = [];
  try {
    const data = await fs.promises.readFile(fileToExtractUrls, 'utf8');
  } catch (error) {
    return 'readFile function failed';
  }
  urlList = data.toLowerCase().match(urlRegex);
  urlList = Array.from(new Set(urlList));

  if (fileToIgnoreUrls) {
    let urlsToIgnore = await fs.promises.readFile(fileToIgnoreUrls, 'utf-8');

    const regexIgnoreUrls = /^(https:\/\/|http:\/\/|#)([\w+\-&@`~#$%^*.=\/?: ]*)/im;

    urlsToIgnore = urlsToIgnore.split('\n');

    let validFile = 0;
    let listToIgnore = [];

    urlsToIgnore.forEach((line) => {
      validFile = regexIgnoreUrls.test(line) ? validFile : ++validFile;
      line.toLowerCase();
      // eslint-disable-next-line no-unused-expressions
      line.match(urlRegex) ? listToIgnore.push(line) : null;
    });

    if (validFile !== 0) throw new Error('Invalid Ignore file.');
    listToIgnore = Array.from(new Set(listToIgnore));

    urlList = urlList.reduce((finalUrls, url) => {
      // eslint-disable-next-line no-param-reassign
      if (protocolRegex.test(url)) url = `https://${url}`;
      if (!listToIgnore.some((ignoreUrl) => url.includes(ignoreUrl))) finalUrls.push(url);
      return finalUrls;
    }, []);
  }

  return urlList;
};

module.exports = {
  readFiles,
};
