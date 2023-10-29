import { useState } from "react";
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

import { deals } from "../../data";
import { Offer } from "../../../types";
import SearchBar from "../../../components/search-bar";
import { addToCart } from "../../../redux/cart-reducer";
import { useAppDispatch } from "../../hooks/useReduxTypeHook";

const { width } = Dimensions.get("window");

const DealPage = () => {
  const { dealId } = useLocalSearchParams<{ dealId: string }>();
  const deal = deals.find((deal) => deal.id === dealId);

  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useAppDispatch();

  const addToCartHandler = (deal: Offer) => {
    setAddedToCart(true);
    dispatch(addToCart(deal));

    setTimeout(() => {
      setAddedToCart(false);
    }, 30_000);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SearchBar />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deal.carouselImages.map((dealItem, index) => (
          <ImageBackground
            source={{ uri: dealItem }}
            resizeMode="contain"
            style={{
              marginTop: 25,
              height: (width * 100) / 100,
              width,
            }}
            key={index}
          >
            <View style={styles.outerContainer}>
              <View style={styles.dealContainer}>
                <Text style={styles.dealText}>20% off</Text>
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
        <Text style={{ fontSize: 14, color: "#424242" }}>{deal.title}</Text>
        <Text style={styles.dealPriceText}>₹{deal.price}</Text>
      </View>

      <Text style={styles.border} />

      <View style={styles.colorSizeContainer}>
        <View style={styles.detailsContainer}>
          <Text>Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{deal.color}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{deal.size}</Text>
        </View>
      </View>

      <Text style={styles.border} />

      <View style={{ padding: 10 }}>
        <Text style={styles.largePriceText}>
          Total <Text style={{ fontSize: 20 }}>₹{deal.price}</Text>
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

      <TouchableOpacity
        style={styles.addToCartBtn}
        onPress={() => addToCartHandler(deal)}
      >
        <Text>{addedToCart ? "Added" : "Add"} to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyNowBtn}>
        <Text>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DealPage;

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
  dealContainer: {
    width: 45,
    height: 45,
    borderRadius: 9999,
    padding: 5,
    backgroundColor: "#c60c30",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dealText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },
  dealPriceText: {
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
