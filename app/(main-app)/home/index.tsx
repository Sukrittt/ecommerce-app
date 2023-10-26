import React from "react";
import { useRouter } from "expo-router";
import { SliderBox } from "react-native-image-slider-box";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useUserLoginStatus } from "../../hooks/useUserLoginStatus";
import { categories, deals, eventImages, offers } from "../../data";
import useGetProducts from "../../hooks/useGetProducts";
import ProductItem from "../../../components/product-item";

const Home = () => {
  const router = useRouter();
  const { authToken } = useUserLoginStatus();
  const { width: screenWidth } = Dimensions.get("window");

  const { products } = useGetProducts();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? 40 : 0 },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={24} color="black" />

          <TouchableOpacity>
            <Text style={styles.locationText}>
              Deliver to Sukrit - Bangalore 560029
            </Text>
          </TouchableOpacity>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryBtn}>
              <Image
                source={{ uri: category.image }}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <SliderBox
          images={eventImages}
          autoplay
          circleloop
          dotColor="#13274f"
          inactiveDotColor="#90a4ae"
          ImageComponentStyle={{ width: "100%" }}
        />

        <Text style={styles.dealHeading}>Trending Deals of the week</Text>

        <View style={styles.dealContainer}>
          {deals.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealBtn}>
              <Image
                source={{ uri: deal.image }}
                style={{ width: screenWidth / 2, height: screenWidth / 2 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.border} />

        <Text style={styles.dealHeading}>Today's Deals</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.offerBtn}>
              <Image
                style={{ height: 150, width: 150 }}
                resizeMode="contain"
                source={{ uri: offer.image }}
              />

              <View style={styles.offerContainer}>
                <Text style={styles.offerText}>Upto {offer.offer}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.border} />

        <View style={styles.productContainer}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "#afeeee",
  },
  locationText: {
    fontSize: 13,
    fontWeight: "500",
  },
  categoryBtn: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
  dealHeading: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  dealContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dealBtn: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  border: {
    height: 1,
    borderColor: "#d0d0d0",
    borderWidth: 2,
    marginTop: 15,
  },
  offerBtn: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  offerContainer: {
    backgroundColor: "#e31837",
    paddingVertical: 5,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
  },
  offerText: {
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
