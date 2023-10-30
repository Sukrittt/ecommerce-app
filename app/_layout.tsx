import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "../store";
import { UserContext } from "../config/user-context";

const Layout = () => {
  return (
    <Provider store={store}>
      <UserContext>
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
      </UserContext>
    </Provider>
  );
};

export default Layout;
