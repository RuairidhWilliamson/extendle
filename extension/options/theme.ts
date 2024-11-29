interface Theme {
  background_color: string;
}

const themes: Theme[] = [
  { background_color: "#52a6c1" },
  { background_color: "#525fc1" },
  { background_color: "#9752c1" },
  { background_color: "#77c152" },
  { background_color: "#bbc152" },
  { background_color: "#aa3838" },
  { background_color: "#d99b70" },
  { background_color: "#d863a8" },
];

function applyTheme(theme: Theme) {
  const rootStyle = document.documentElement.style;
  rootStyle.backgroundColor = theme.background_color;
}

applyTheme(themes[(new Date()).getMilliseconds() % themes.length]);
