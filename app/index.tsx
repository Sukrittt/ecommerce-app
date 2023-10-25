import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </>
  );
};

export default Home;
