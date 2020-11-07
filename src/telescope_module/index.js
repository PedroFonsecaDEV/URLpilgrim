const fetch = require("node-fetch");

const lastPosts = async () => {
  // fetch("http://localhost:3000/posts")
  let postsIds = await fetch("https://telescope.cdot.systems/posts");
  postsIds = postsIds.json();
  return postsIds;
};

const buildUrls = (lastPostsIds) => {
  const postsUrls = lastPostsIds.reduce((acc, {url}, index) => {
    const postUrl = "https://telescope.cdot.systems" + url;
    acc = [...acc, postUrl];
    console.log(index,acc);
    return acc;
  },[]);

  return postsUrls;
}

module.exports = {
  lastPosts,
  buildUrls,
};
