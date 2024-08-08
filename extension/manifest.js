const buildManifest = (mode) => ({
  manifest_version: 3,
  name: "Extendle",
  version: "0.0.1",
  description: "Manage your favourite wordle variants",

  icons: {
    16: "icons/icon-16.png",
    48: "icons/icon-48.png",
    128: "icons/icon-128.png",
    256: "icons/icon-256.png",
  },

  background: mode === "firefox" ? {
    scripts: ["background.js"],
  } : {
    service_worker: "background.js",
  },

  action: {
    default_title: "Extendle",
  },

  options_ui: {
    page: "options/index.html",
    open_in_tab: true,
  },

  permissions: [
    "storage",
  ],

  browser_specific_settings: mode === "firefox" ? {
    gecko: {
      id: "extendle@rtaw.co.uk"
    }
  } : undefined,
});

const mode = process.argv[2];
if (mode === undefined || (mode !== "chrome" && mode !== "firefox")) {
  console.error("mode not set, must be one of 'chrome' or 'firefox'");
  process.exit(1);
}

console.log(JSON.stringify(buildManifest(mode)));
