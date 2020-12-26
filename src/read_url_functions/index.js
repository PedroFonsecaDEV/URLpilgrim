const fetch = require('node-fetch');
const { testUrl } = require('../url_functions');

const getUrlsContent = async (url) => {
  try {
    const urlResult = await fetch(url, {
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
