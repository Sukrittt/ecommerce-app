import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { useUserLoginStatus } from "../../../hooks/useUserLoginStatus";

const AddAdress = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleAddAdress = () => {};

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#00ced1",
        flex: 1,
        paddingTop: Platform.OS === "android" ? 30 : 0,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.topBanner} />

        <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
          <Text style={styles.addNewAddressText}>Add a new address</Text>
          <TextInput
            value={country}
            onChangeText={(text) => setCountry(text)}
            placeholder="India"
            placeholderTextColor="black"
            style={styles.textInput}
          />

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textLabel}>
              Full name (First and Last name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter your full name"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textLabel}>Mobile number</Text>
            <TextInput
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text)}
              placeholder="Enter your mobile number"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textLabel}>
              Flat, House no., Building, Company, Apartment
            </Text>
            <TextInput
              value={houseNumber}
              onChangeText={(text) => setHouseNumber(text)}
              style={styles.textInput}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textLabel}>Area, Street, Sector, Village</Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              style={styles.textInput}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textLabel}>Landmark</Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholder="E.g. near apollo hospital"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textLabel}>Pincode</Text>
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholder="6 Digits [0-9] PIN code"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textLabel}>Town/City</Text>
            <TextInput
              placeholder="Enter your city/town"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          </View>

          <TouchableOpacity
            style={styles.addAddressBtn}
            onPress={handleAddAdress}
          >
            <Text style={{ fontSize: 15 }}>Add address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAdress;

const styles = StyleSheet.create({
  topBanner: {
    height: 50,
    backgroundColor: "#00ced1",
  },
  addNewAddressText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    padding: 10,
    borderColor: "#d0d0d0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  textLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  addAddressBtn: {
    backgroundColor: "#ffd814",
    padding: 15,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
