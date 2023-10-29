import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

import SearchBar from "../../../components/search-bar";
import { offers } from "../../data";

const { width } = Dimensions.get("window");

const OfferPage = () => {
  const { offerId } = useLocalSearchParams<{ offerId: string }>();

  const offer = offers.find((offer) => offer.id === offerId);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SearchBar />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {offer.carouselImages.map((offerItem, index) => (
          <ImageBackground
            source={{ uri: offerItem }}
            resizeMode="contain"
            style={{
              marginTop: 25,
              height: (width * 100) / 100,
              width,
            }}
            key={index}
          >
            <View style={styles.outerContainer}>
              <View style={styles.offerContainer}>
                <Text style={styles.offerText}>20% off</Text>
              </View>

              <View>
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  size={28}
                  color="#1e1e1e"
                />
              </View>
            </View>

            <View style={{ marginTop: "auto", paddingLeft: 20 }}>
              <AntDesign name="hearto" size={24} color="#1e1e1e" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 14, color: "#424242" }}>{offer.title}</Text>
        <Text style={styles.offerPriceText}>₹{offer.price}</Text>
      </View>

      <Text style={styles.border} />

      <View style={styles.colorSizeContainer}>
        <View style={styles.detailsContainer}>
          <Text>Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {offer.color}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{offer.size}</Text>
        </View>
      </View>

      <Text style={styles.border} />

      <View style={{ padding: 10 }}>
        <Text style={styles.largePriceText}>
          Total <Text style={{ fontSize: 20 }}>₹{offer.price}</Text>
        </Text>
        <Text>FREE delivery by tomorrow 3pm. Order within 1hr 32mins.</Text>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#303030" />

          <Text style={{ fontSize: 15, fontWeight: "500", color: "#288798" }}>
            Deliver to Sukrit - Bangalore 560029
          </Text>
        </View>
      </View>

      <Text style={styles.inStockText}>IN Stock</Text>

      <TouchableOpacity style={styles.addToCartBtn}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyNowBtn}>
        <Text>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OfferPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    backgroundColor: "white",
  },
  outerContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  offerContainer: {
    width: 45,
    height: 45,
    borderRadius: 9999,
    padding: 5,
    backgroundColor: "#c60c30",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  offerText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },
  offerPriceText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
  },
  border: {
    height: 1,
    borderColor: "#d0d0d0",
    borderWidth: 1,
  },
  colorSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  largePriceText: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
  },
  locationContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    gap: 5,
  },
  inStockText: {
    color: "green",
    marginHorizontal: 10,
    fontWeight: "500",
  },
  addToCartBtn: {
    backgroundColor: "#ffd814",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buyNowBtn: {
    backgroundColor: "#ffa41c",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
