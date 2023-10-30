import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SearchBar from "../../../components/search-bar";
const Addresses = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 30 : 0,
        backgroundColor: "#00ced1",
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <SearchBar />

        <View style={{ padding: 10 }}>
          <Text style={styles.addressTitle}>Your Addresses</Text>

          <TouchableOpacity
            style={styles.addAddressBtn}
            onPress={() => router.push("/address/add")}
          >
            <Text>Add a new address</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {/* <TouchableOpacity> */}
          {/* </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  addressTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addAddressBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
