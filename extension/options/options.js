const defaultActiveList = [
  "wordle",
];

browser.storage.sync.get("active_list").then(activeList => {
  activeList = activeList.active_list || defaultActiveList;
  const activeListElem = document.getElementById("active-list");
  const inactiveListElem = document.getElementById("inactive-list");

  let draggingItem = null;

  const dragUpdate = (list, ev) => {
    ev.preventDefault();
    for (const child of list.children) {
      if (ev.clientY <= child.offsetTop + child.offsetHeight / 2) {
        if (child === draggingItem) return;
        child.before(draggingItem);
        return;
      }
    }
    list.append(draggingItem);
  };

  [activeListElem, inactiveListElem].forEach(list => {
    list.addEventListener("dragover", ev => dragUpdate(list, ev));
    list.addEventListener("dragenter", ev => dragUpdate(list, ev));
  });

  const createRow = (game) => {
    const row = document.createElement("div");
    row.classList.add("game-row");
    row.draggable = true;
    row.setAttribute("gameid", game.id);
    row.addEventListener("dragstart", ev => {
      ev.dataTransfer.setData("text/uri-list", game.url);
      ev.dataTransfer.setData("text/plain", game.url);
      ev.target.classList.add("dragging");
      draggingItem = row;
    });
    row.addEventListener("dragend", ev => {
      ev.target.classList.remove("dragging");
      draggingItem = null;
      let newActiveList = [];
      for (const child of activeListElem.children) {
        const game_id = child.getAttribute("gameid");
        newActiveList.push(game_id);
      }
      browser.storage.sync.set({
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
  GAMES_PROMISE.then(games => {
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
  })
});

const openAllBtn = document.getElementById("open-all");
openAllBtn.addEventListener("click", async () => {
  await openActive();
});
