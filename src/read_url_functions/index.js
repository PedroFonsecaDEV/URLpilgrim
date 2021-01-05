const fetch = require('node-fetch');
const { testUrl, isUrl } = require('../url_functions');

const getUrlsContent = async (url) => {
  console.log('aaaa:', url);
  const checkUrl = isUrl(url);
  try {
    const urlResult = await fetch(checkUrl, {
      timeout: 1500,
      Accept: 'text/html',
    });
    const content = await urlResult.text();
    return content;
  } catch (error) {
    console.log('ERROR', error);
    return { url: url, content: null };
  }
};

const readUrls = (urlToRead) => {
  const urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi;

  getUrlsContent(urlToRead)
    .then((finalResult) => {
      // eslint-disable-next-line no-unused-expressions
      const urlsToTest = finalResult.toLowerCase().match(urlRegex);
      testUrl(Array.from(new Set(urlsToTest)));
      return null;
    })
    .catch((error) => console.log('ERROR', error));
};

module.exports = {
  readUrls,
};

// TODO: VALIDATE URL BEFORE REQUEST CONTENT.
