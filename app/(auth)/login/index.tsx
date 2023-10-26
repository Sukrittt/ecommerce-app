import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { API_ENDPOINT } from "../../../config";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const user = { email, password };

    try {
      const response = await axios.post(`${API_ENDPOINT}/login`, user);
      const token = response.data.token;

      AsyncStorage.setItem("authToken", token);

      resetState();
      router.push("/home");
    } catch (error) {
      Alert.alert("Something went wrong", "Please try again");
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../public/images/logo.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.loginHeading}>Login to your account</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              size={24}
              style={{ marginLeft: 8 }}
              color="gray"
            />

            <TextInput
              placeholder="Enter your email"
              style={[styles.input, { fontSize: email ? 16 : 16 }]}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <AntDesign
              name="lock"
              size={24}
              style={{ marginLeft: 8 }}
              color="gray"
            />

            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              style={[styles.input, { fontSize: email ? 16 : 16 }]}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        <View style={styles.authFooter}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007fff", fontWeight: "500" }}>
            Forgot password
          </Text>
        </View>

        <View style={{ marginTop: 80 }}>
          <TouchableOpacity
            disabled={loading}
            style={[
              styles.actionButton,
              {
                opacity: loading ? 0.5 : 1,
              },
            ]}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.actionText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.footerText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoImage: {
    height: 125,
    width: 150,
  },
  loginHeading: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041e42",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#d0d0d0",
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 30,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
  },
  authFooter: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    width: 200,
    backgroundColor: "#febe10",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },
  actionText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});
