import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

import store from "../store";

const Layout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(main-app)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/login/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/register/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </Provider>
  );
};

export default Layout;
