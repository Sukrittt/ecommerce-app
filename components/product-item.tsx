import { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { Product } from "../types";
import { addToCart } from "../redux/cart-reducer";
import { useAppDispatch, useAppSelector } from "../app/hooks/useReduxTypeHook";

const { width: screenWidth } = Dimensions.get("window");

const ProductItem = ({ product }: { product: Product }) => {
  // const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    setAddedToCart(true);
    dispatch(addToCart(product));

    setTimeout(() => setAddedToCart(false), 30_000);
  };

  return (
    <TouchableOpacity
      style={styles.productItemContainer}
      // onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image
        style={{ width: screenWidth / 2 - 40, height: screenWidth / 2 - 40 }}
        resizeMode="contain"
        source={{ uri: product.image }}
      />

      <Text numberOfLines={1} style={styles.productTitle}>
        {product.title}
      </Text>

      <View style={styles.productNumbers}>
        <Text style={styles.productPrice}>₹{product.price}</Text>
        <Text style={styles.productRating}>{product.rating.rate} ratings</Text>
      </View>

      <TouchableOpacity style={styles.addToCartBtn} onPress={addToCartHandler}>
        <Text>{addedToCart ? "Added" : "Add"} to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productItemContainer: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  productTitle: {
    width: 150,
    marginTop: 10,
  },
  productNumbers: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
  },
  productRating: {
    color: "#ffc72c",
    fontWeight: "bold",
  },
  addToCartBtn: {
    backgroundColor: "#ffc72c",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
