GAMES_PROMISE = (async () => {
  const resp = await fetch("https://extendle-backend-oa3c2clcza-ez.a.run.app/games");
  return await resp.json();
})();

openActive = async () => {
  const isFirefox = typeof browser !== "undefined";
  let activeList = await browser.storage.sync.get("active_list");
  activeList = activeList.active_list || defaultActiveList;

  const createOptions = {
    active: false,
  };
  if (isFirefox) {
    createOptions.discarded = true;
  }
  GAMES_PROMISE.then(games => {
    activeList.forEach(id => {
      const game = games.games.find(g => g.id === id);
      if (game === undefined) {
        return;
      }
      const url = game.url;
      chrome.tabs.create({
        url,
        ...createOptions
      });
    });
  });
};
