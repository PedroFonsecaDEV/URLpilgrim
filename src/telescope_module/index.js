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

const readUrls = (postUrlsArray) => {
  const fetchUrl = async (url) => {
    try {
      const urlResult = await fetch(url, {
        timeout: 1500,
        // headers: { "Content-Type": "text/html" },
      });
      return { url: url, content: urlResult.text()};
    } catch (error) {
      return { url: url, status: 400 };
    }
  };

  const urlPromises = postUrlsArray.map(fetchUrl);
  Promise.all(urlPromises).then((finalResults) =>
    finalResults.map((urlTest) => {console.log(urlTest.content)})
  );
};

module.exports = {
  lastPosts,
  buildUrls,
  readUrls,
};
