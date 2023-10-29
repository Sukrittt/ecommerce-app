import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity style={styles.searchBtn}>
        <AntDesign
          style={{ paddingLeft: 10 }}
          name="search1"
          size={22}
          color="black"
        />
        <TextInput placeholder="Search Amazon.in" />
      </TouchableOpacity>

      <Feather name="mic" size={24} color="black" />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#00ced1",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
});
