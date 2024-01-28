const brx = chrome;
const defaultActiveList = [
  "wordle",
];

interface Game {
  id: string,
  label: string,
  url: string,
};

interface GameList {
  games: Array<Game>,
};

const games_promise = (async () => {
  const resp = await fetch("https://extendle-backend-oa3c2clcza-ez.a.run.app/games");
  const games_list: GameList = await resp.json();
  return games_list;
})();

const getActiveList = async () => {
  const stored = await brx.storage.sync.get("active_list");
  const activeList: Array<string> = stored.active_list || defaultActiveList;
  return activeList;
};

const openActive = async () => {
  const stored = await brx.storage.sync.get("active_list");
  const activeList: Array<string> = stored.active_list || defaultActiveList;

  const createOptions: browser.tabs._CreateCreateProperties = {
    active: false,
  };
  const isFirefox = typeof browser !== "undefined";
  if (isFirefox) {
    // createOptions.discarded only exists on firefox
    // it prevents the new tabs from loading until you switch to them
    createOptions.discarded = true;
  }
  const games = await games_promise;
  activeList.forEach(id => {
    const game = games.games.find(g => g.id === id);
    if (game === undefined) {
      return;
    }
    const url = game.url;
    brx.tabs.create({
      url,
      ...createOptions
    });
  });
};

const init = async () => {

  const activeList = await getActiveList();
  const activeListElem = document.getElementById("active-list")!;
  const inactiveListElem = document.getElementById("inactive-list")!;

  const openAllBtn = document.getElementById("open-all")!;
  openAllBtn.addEventListener("click", openActive);

  let draggingItem: HTMLElement | null = null;

  const dragUpdate = (list: HTMLElement, ev: DragEvent) => {
    ev.preventDefault();
    for (const child of list.children) {
      const htmlChild = <HTMLElement>child;
      if (ev.clientY <= htmlChild.offsetTop + htmlChild.offsetHeight / 2) {
        if (htmlChild === draggingItem) return;
        child.before(draggingItem!);
        return;
      }
    }
    list.append(draggingItem!);
  };

  [activeListElem, inactiveListElem].forEach(list => {
    list.addEventListener("dragover", ev => dragUpdate(list, ev));
    list.addEventListener("dragenter", ev => dragUpdate(list, ev));
  });

  const createRow = (game: Game) => {
    const row = document.createElement("div");
    row.classList.add("game-row");
    row.draggable = true;
    row.setAttribute("gameid", game.id);
    row.addEventListener("dragstart", ev => {
      ev.dataTransfer!.setData("text/uri-list", game.url);
      ev.dataTransfer!.setData("text/plain", game.url);
      (<HTMLElement>ev.target).classList.add("dragging");
      draggingItem = row;
    });
    row.addEventListener("dragend", (ev: DragEvent) => {
      (<HTMLElement>ev.target).classList.remove("dragging");
      draggingItem = null;
      let newActiveList = [];
      for (const child of activeListElem.children) {
        const game_id = child.getAttribute("gameid");
        newActiveList.push(game_id);
      }
      brx.storage.sync.set({
        "active_list": newActiveList,
      });
    });
    const icon = document.createElement("img");
    icon.src = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + game.url;
    const label = document.createElement("a");
    label.innerText = game.label;
    row.append(icon, label);
    return row;
  };
  const games = await games_promise;
  activeList.forEach(game_id => {
    const game = games.games.find(g => g.id === game_id);
    if (game === undefined) {
      return;
    }
    activeListElem.append(createRow(game));
  });
  games.games.forEach(game => {
    if (!activeList.includes(game.id)) {
      inactiveListElem.append(createRow(game));
    }
  });
};

init();
