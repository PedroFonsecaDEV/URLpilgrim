const fetch = require('node-fetch');
const { testUrl } = require('../url_functions');

const lastPosts = async () => {
  // fetch("http://localhost:3000/posts")
  let postsIds = await fetch('https://telescope.cdot.systems/posts');
  postsIds = postsIds.json();
  return postsIds;
};

const buildUrls = (lastPostsIds) => {
  const postsUrls = lastPostsIds.reduce((acc, { url }) => {
    const postUrl = `https://telescope.cdot.systems${url}`;
    const newAcc = [...acc, postUrl];
    return newAcc;
  }, []);

  return postsUrls;
};

const getUrlsContent = async (url) => {
  try {
    const urlResult = await fetch(url, {
      timeout: 1500,
      Accept: 'text/html',
    });
    const fetchResult = await urlResult.json();
    return { url: url, content: fetchResult.html };
  } catch (error) {
    return { url: url, content: null };
  }
};

const readUrls = (postUrlsArray) => {
  const urlRegex = /(((http|https):\/\/)|(www\.))([\w+\-&@`~#$%^*.=\/?:]+)/gi;

  const urlPromises = postUrlsArray.map(getUrlsContent);

  Promise.all(urlPromises)
    .then((finalResults) =>
      finalResults.map(({ content }) => {
        const contentToCheck = Array.from(new Set(content.toLowerCase().match(urlRegex)));
        testUrl(contentToCheck);
        return null;
      })
    )
    .catch((error) => console.log('ERROR', error));
};

module.exports = {
  lastPosts,
  buildUrls,
  readUrls,
};
