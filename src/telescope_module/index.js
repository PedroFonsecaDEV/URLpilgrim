const fetch = require("node-fetch");
const { printLog } = require("../console_messages");

const lastPosts = async () => {
  // fetch("http://localhost:3000/posts")
  let postsIds = await fetch("https://telescope.cdot.systems/posts");
  postsIds = postsIds.json();
  return postsIds;
};

const buildUrls = (lastPostsIds) => {
  const postsUrls = lastPostsIds.reduce((acc, { url }, index) => {
    const postUrl = "https://telescope.cdot.systems" + url;
    acc = [...acc, postUrl];
    return acc;
  }, []);

  return postsUrls;
};

const getUrlsContent = async (url) => {
  try {
    const urlResult = await fetch(url, {
      timeout: 1500,
      Accept: "text/html"
    });
    const fetchResult = await urlResult.json();
    // return { url: url, content: urlResult.text()};
    return { url: url, content: fetchResult.html};
  } catch (error) {
    return { url: url, status: 400 };
  }
};

const readUrls = (postUrlsArray) => {

  const urlPromises = postUrlsArray.map(getUrlsContent);
  Promise.all(urlPromises).then((finalResults) =>
    finalResults.map((urlTest) => {console.log((urlTest.content))})
  );
};

module.exports = {
  lastPosts,
  buildUrls,
  readUrls,
};
