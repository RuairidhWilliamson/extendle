const identifyGame = () => {
  const href = window.location.href;

  let game = "unknown";
  if (href.includes("nytimes.com/games/wordle")) {
    game = "wordle";
  } else {
    console.error("unidentified wordle");
  }

  console.log("identified game:", game);
}

identifyGame();
