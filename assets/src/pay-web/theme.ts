const colors = {
  white: "#FFF",
  whiteSmoke: "#F5F5F5",
  black: "#313131",
  chateauGreen: "#32A556",
  darkGreen: "#026540",
  highlightGreen: "#D7EA6A",
  darkGray: "#88989D",
  midGray: "#D8D8D8",
  lightGray: "#EEE",
  oceanBlue: "#0F6493",
  highlightBlue: "#00BFE9",
  orange: "#EDB131",
  red: "#B10E1E",
  basicBlue: "#0052cc",
  darkerBlue: "#0041A3",
  borderBlue: "#2684FF",

  // TODO: rename these
  flair: "#773dc7",
  dtaBlue: "#2AB4E7",
  payBlue: "#002341",
  payPink: "#DE0D79",
  payDarkerBlue: "#011628",
  payHeaderBar: "#1d70b8",
  links: "#1d70b8"
};

const palette = {
  bgColor: colors.white,
  textColor: colors.black,
  linkColor: colors.links,
  sectionLabel: colors.chateauGreen,
  sectionBackground: colors.whiteSmoke,
  brandPrimary: colors.payBlue,
  brandSecondary: colors.payDarkerBlue,
  footer: {
    textColor: colors.black,
    bgColor: colors.lightGray
  }
};

type Palette = typeof palette;

export interface Theme extends Palette {
  colors: typeof colors;
  fontFamily: string;
}

const fontFamily = [
  "-apple-system",
  "BlinkMacSystemFont",
  `"Segoe UI"`,
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  `"Fira Sans"`,
  `"Droid Sans"`,
  `"Helvetica Neue"`,
  "sans-serif"
].join(",");

const theme: Theme = {
  fontFamily,
  colors,
  ...palette
};

export { theme as default };
