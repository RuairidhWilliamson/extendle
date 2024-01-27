const openAllBtn = document.getElementById("open-all");
const settingsBtn = document.getElementById("settings");

openAllBtn.addEventListener("click", async () => {
  await openActive();
});

settingsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
