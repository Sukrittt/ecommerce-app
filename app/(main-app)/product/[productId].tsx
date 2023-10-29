import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import SearchBar from "../../../components/search-bar";

const ProductPage = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SearchBar />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      ></ScrollView>
    </ScrollView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    backgroundColor: "white",
  },
});
