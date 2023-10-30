import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Modal, ModalContent } from "./ui/modal";

const AddressModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <Modal
      showModal={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      style={styles.modalContainer}
    >
      <ModalContent style={styles.modalContentContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.modalHeading}>Choose your location</Text>
          <Text style={styles.modalSecondaryHeading}>
            Select a delivery location to see product availability and delivery
            options.
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.addressBtn}
            onPress={() => {
              router.push("/address");
              setShowModal(false);
            }}
          >
            <Text style={styles.addAddressText}>
              Add an address or pick-up point
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.footerContainer}>
            <Entypo name="location-pin" size={24} color="#0066b2" />
            <Text style={{ color: "#0066b2" }}>Enter an Indian pincode</Text>
          </View>

          <View style={styles.footerContainer}>
            <MaterialCommunityIcons name="target" size={24} color="#0066b2" />
            <Text style={{ color: "#0066b2" }}>Use my current location</Text>
          </View>
        </View>
      </ModalContent>
    </Modal>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  modalContentContainer: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#303030",
  },
  modalSecondaryHeading: {
    fontSize: 14,
    color: "gray",
    width: "85%",
  },
  addressBtn: {
    height: 140,
    width: 140,
    borderRadius: 10,
    borderColor: "#d0d0d0",
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addAddressText: {
    color: "#0066b2",
    textAlign: "center",
    fontWeight: "500",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
