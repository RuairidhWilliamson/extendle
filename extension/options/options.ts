const brx = chrome;
const defaultActiveList = ["wordle"];
const defaultRandomList: Array<string> = [];
const defaultRandomCount: number = 2;

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

interface Settings {
  activeList: Array<string>,
  randomList: Array<string>,
  randomCount: number,
};

const defaultSettings: Settings = {
  activeList: ["wordle"],
  randomList: [],
  randomCount: 2,
};

const getSettings = async (): Promise<Settings> => {
  const settings = (await brx.storage.sync.get("settings")).settings || {};
  if (!settings.activeList) {
    settings.activeList = defaultSettings.activeList;
  }
  if (!settings.randomList) {
    settings.randomList = defaultSettings.randomList;
  }
  if (!settings.randomCount) {
    settings.randomCount = defaultSettings.randomCount;
  }
  console.log(settings);
  return settings;
};

const saveSettings = async (settings: Settings) => {
  await brx.storage.sync.set({ "settings": settings });
};

const openAll = async () => {
  const settings: Settings = await getSettings();

  const chosenRandomList: Array<string> = [];
  for (let i = 0; i < settings.randomCount && settings.randomList.length > 0; i++) {
    const index = Math.floor(Math.random() * settings.randomList.length);
    const [element] = settings.randomList.splice(index, 1);
    chosenRandomList.push(element);
  }

  const combinedList = settings.activeList.concat(chosenRandomList);

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
  combinedList.forEach(id => {
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
  const settings = await getSettings();
  const activeListElem = document.getElementById("active-list")!;
  const randomListElem = document.getElementById("random-list")!;
  const inactiveListElem = document.getElementById("inactive-list")!;
  const randomCountElem = document.getElementById("random-list-count")!;

  (<HTMLInputElement>randomCountElem).valueAsNumber = settings.randomCount;
  randomCountElem.addEventListener("change", (ev) => {
    const random_count = (<HTMLInputElement>ev.target).valueAsNumber;
    settings.randomCount = random_count;
    saveSettings(settings);
  });

  const openAllBtn = document.getElementById("open-all")!;
  openAllBtn.addEventListener("click", openAll);

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

  [activeListElem, randomListElem, inactiveListElem].forEach(list => {
    list.addEventListener("dragover", ev => dragUpdate(list, ev));
    list.addEventListener("dragenter", ev => dragUpdate(list, ev));
  });

  const createRow = (game: Game) => {
    const row = document.createElement("div");
    row.classList.add("game-row");
    row.draggable = false;
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
      const newActiveList = [];
      const newRandomList = [];
      for (const child of activeListElem.children) {
        const game_id = child.getAttribute("gameid");
        newActiveList.push(game_id!);
      }
      for (const child of randomListElem.children) {
        const game_id = child.getAttribute("gameid");
        newRandomList.push(game_id!);
      }
      settings.activeList = newActiveList;
      settings.randomList = newRandomList;
      saveSettings(settings);
    });
    const handle = document.createElement("div");
    handle.classList.add("handle");
    handle.addEventListener("mousedown", () => {
      row.draggable = true;
    });
    handle.addEventListener("mouseup", () => {
      row.draggable = false;
    });
    const icon = document.createElement("img");
    icon.src = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + game.url;
    const label = document.createElement("a");
    label.innerText = game.label;
    const openLink = document.createElement("a");
    openLink.href = game.url;
    openLink.target = "_blank";
    openLink.classList.add("openlink");
    const openIcon = document.createElement("i");
    openIcon.classList.add("fa-solid", "fa-arrow-up-right-from-square");
    openLink.append(openIcon);
    row.append(handle, icon, label, openLink);
    return row;
  };
  const games = await games_promise;
  settings.activeList.forEach(game_id => {
    const game = games.games.find(g => g.id === game_id);
    if (game === undefined) {
      return;
    }
    activeListElem.append(createRow(game));
  });
  settings.randomList.forEach(game_id => {
    const game = games.games.find(g => g.id === game_id);
    if (game === undefined) {
      return;
    }
    randomListElem.append(createRow(game));
  });
  games.games.forEach(game => {
    if (!settings.activeList.includes(game.id) && !settings.randomList.includes(game.id)) {
      inactiveListElem.append(createRow(game));
    }
  });
};

init();
