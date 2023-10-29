import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { SliderBox } from "react-native-image-slider-box";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView as VirtualizedScrollView } from "react-native-virtualized-view";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
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
import {
  CATEGORY_DATA,
  categories,
  deals,
  eventImages,
  offers,
} from "../../data";
import useGetProducts from "../../hooks/useGetProducts";
import SearchBar from "../../../components/search-bar";
import ProductItem from "../../../components/product-item";

type Category =
  | "men's clothing"
  | "women's clothing"
  | "jewelery"
  | "electronics";

const Home = () => {
  const router = useRouter();
  const { authToken } = useUserLoginStatus();
  const { width: screenWidth } = Dimensions.get("window");

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("jewelery");

  const [companyOpen, setCompanyOpen] = useState(false);
  const [categoryItems, setCategoryItems] =
    useState<{ label: string; value: Category }[]>(CATEGORY_DATA);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const onChange = useCallback(() => {
    // setCompanyOpen(false)
  }, []);

  const { products } = useGetProducts();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? 40 : 0 },
      ]}
    >
      <VirtualizedScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />

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
            <TouchableOpacity
              key={offer.id}
              style={styles.offerBtn}
              onPress={() => router.push(`/offer/${offer.id}`)}
            >
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

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: "45%",
            marginBottom: open ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={[styles.dropdownPicker, { marginBottom: open ? 120 : 15 }]}
            open={open}
            value={category}
            items={categoryItems}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setCategoryItems}
            placeholder="Choose a category"
            // placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View style={styles.productContainer}>
          {products
            .filter((product) => product.category === category)
            .map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </View>
      </VirtualizedScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  dropdownPicker: {
    borderColor: "#B7B7B7",
    height: 30,
  },
});
