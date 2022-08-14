import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import AuthRoot from "./src/screens/navroots/AuthRoot";
import { defaultTheme, darkTheme } from "./assets/theme";

function App() {
  return (
    <SafeAreaProvider>
      <AuthRoot />
    </SafeAreaProvider>
  );
}

export default function AppWithProviders() {
  const theme =
    Appearance.getColorScheme() == "light" ? defaultTheme : darkTheme;
  return (
    <PaperProvider theme={defaultTheme}>
      <App />
    </PaperProvider>
  );
}
