import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import AuthRoot from "./src/screens/navroots/AuthRoot";
import { defaultTheme, darkTheme } from "./assets/theme";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AuthRoot />
    </SafeAreaProvider>
  );
}

export default function AppWithProviders() {
  const theme =
    Appearance.getColorScheme() == "light" ? defaultTheme : darkTheme;
  return (
    <Provider store={store}>
      <PaperProvider theme={defaultTheme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}
