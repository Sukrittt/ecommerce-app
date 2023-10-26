import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
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
  );
};

export default Layout;
