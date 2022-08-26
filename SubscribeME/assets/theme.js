import {
  DefaultTheme as NavigationDefault,
  DarkTheme as NavigationDark,
} from "@react-navigation/native";

import {
  DefaultTheme as PaperDefault,
  DarkTheme as PaperDark,
} from "react-native-paper";

import merge from "deepmerge";

const CombinedDefaultTheme = merge(PaperDefault, NavigationDefault);
const CombinedDarkTheme = merge(PaperDark, NavigationDark);

const defaultTheme = {
  ...CombinedDefaultTheme,
  roundness: 12,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: "#3E3384",
    secondary: "#CA4D57",
    background: "#FFF9F3",
    card: "#FFF9F3", // Navigation header and bottom bar bckgnd
    accent: "#AF9408",
    border: "#FFFFFF",
  },
};
const darkTheme = defaultTheme;

export { defaultTheme, darkTheme };

// "#3E3384" cosmic cobalt (dark blue) - 62, 51, 132
// "#3098FF" dodger blue - 48, 152, 255
// "#FF9428" deep saffron (orange) - 255, 148, 40
// "#CA4D57" brick red - 202, 77, 87
// "#FFF9F3" seashell - 255, 249, 243
// #FFFFFF,#FFF9F3,#FFEEDE,#FFE4CA,#FFDAB5,#FFD0A1,#FFC68D
