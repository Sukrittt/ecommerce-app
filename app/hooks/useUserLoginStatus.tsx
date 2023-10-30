import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserType } from "../../config/user-context";

export const useUserLoginStatus = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);

  const { userId, setUserId } = useContext(UserType);

  const setUserLoginStatus = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      setAuthToken(authToken);

      return authToken;
    } catch (error) {
      console.log("error", error);
      Alert.alert("Error", "Something went wrong. Please login again.");
      router.push("/login");
    }
  };

  const getUserId = async () => {
    try {
      const authToken = await setUserLoginStatus();
      const decodedToken = jwtDecode(authToken);

      setUserId(decodedToken.jti);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Error", "Something went wrong. Please login again.");
      router.push("/login");
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  return { authToken, userId };
};
