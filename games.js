GAMES = [
  {
    id: "crossword",
    label: "Universal Crossword",
    url: "https://www.theglobeandmail.com/puzzles-and-crosswords/universal-crossword/",
  },
  {
    id: "wordle",
    label: "Wordle",
    url: "https://www.nytimes.com/games/wordle/index.html",
  },
  {
    id: "worldle",
    label: "Worldle",
    url: "https://worldle.teuteuf.fr",
  },
  {
    id: "travle",
    label: "Travle",
    url: "https://travle.earth",
  },
  {
    id: "wheretaken",
    label: "WhereTaken",
    url: "https://wheretaken.teuteuf.fr",
  },
  {
    id: "wheretakenusa",
    label: "WhereTakenUSA",
    url: "https://wheretakenusa.teuteuf.fr",
  },
  {
    id: "statele",
    label: "Statele",
    url: "https://statele.teuteuf.fr/",
  },
  {
    id: "flagle",
    label: "Flagle",
    url: "https://www.flagle.io",
  },
  {
    id: "framed",
    label: "Framed",
    url: "https://framed.wtf",
  },
  {
    id: "episode",
    label: "Episode",
    url: "https://episode.wtf",
  },
  {
    id: "pimantle",
    label: "Pimantle",
    url: "https://semantle.pimanrul.es",
  },
  {
    id: "moviedle",
    label: "Moviedle",
    url: "https://moviedle.xyz",
  },
  {
    id: "arcade-moviedle",
    label: "Moviedle",
    url: "https://www.moviedle.app",
  },
  {
    id: "semantle-junior",
    label: "Semantle Junior",
    url: "https://semantle.com/junior",
  },
  {
    id: "semantle",
    label: "Semantle",
    url: "https://semantle.com",
  },
  {
    id: "plotwords",
    label: "Plotwords",
    url: "https://plotwords.com",
  },
  {
    id: "rankdle",
    label: "Rankdle",
    url: "https://rankdle.com",
  },
  {
    id: "word-connection",
    label: "Word Connection",
    url: "https://www.thewordfinder.com/word-connection/",
  },
];

openActive = async () => {
  const isFirefox = typeof browser !== "undefined";
  const isChrome = !isFirefox;
  let activeList = await browser.storage.sync.get("active_list");
  activeList = activeList.active_list || defaultActiveList;

  const createOptions = {
    active: false,
  };
  if (isFirefox) {
    createOptions.discarded = true;
  }
  activeList.forEach(id => {
    const game = GAMES.find(g => g.id === id);
    if (game === undefined) {
      return;
    }
    const url = game.url;
    chrome.tabs.create({
      url,
      ...createOptions
    });
  })
};
