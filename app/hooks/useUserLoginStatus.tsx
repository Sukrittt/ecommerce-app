import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserLoginStatus = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);

  const setUserLoginStatus = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      setAuthToken(authToken);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Error", "Something went wrong. Please login again.");
      router.push("/login");
    }
  };

  useEffect(() => {
    setUserLoginStatus();
  }, []);

  return { authToken };
};
