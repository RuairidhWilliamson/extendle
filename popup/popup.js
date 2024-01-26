const isFirefox = typeof browser !== "undefined";
const isChrome = !isFirefox;

const openAllBtn = document.getElementById("open-all");
const settingsBtn = document.getElementById("settings");

openAllBtn.addEventListener("click", () => {
  const gameUrls = [
    // "http://syndication.andrewsmcmeel.com/puzzles/crosswords",
    // "crossword/index.html",
    "https://www.theglobeandmail.com/puzzles-and-crosswords/universal-crossword/",

    "https://www.nytimes.com/games/wordle/index.html",
    "https://worldle.teuteuf.fr",
    "https://travle.earth/",
    "https://wheretaken.teuteuf.fr",
    "https://wheretakenusa.teuteuf.fr",
    "https://framed.wtf",
    "https://episode.wtf",
    "https://semantle.pimanrul.es",
  ];
  const createOptions = {
    active: false,
  };
  if (isFirefox) {
    createOptions.discarded = true;
  }
  gameUrls.forEach(url => {
    chrome.tabs.create({
      url,
      ...createOptions
    });
  })
});
