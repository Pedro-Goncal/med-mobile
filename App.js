import { StyleSheet, Text, View } from "react-native";

// Routes
import Routes from "./Routes/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

import { TailwindProvider } from "tailwindcss-react-native";

export default function App() {
  return (
    <TailwindProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <Routes />
        </View>
      </Provider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
