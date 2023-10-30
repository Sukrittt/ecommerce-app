import { StyleSheet, Text, View } from "react-native";

import { Modal, ModalContent } from "./ui/modal";

const AddressModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) => {
  return (
    <Modal
      showModal={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      style={styles.modalContainer}
    >
      <ModalContent>
        <View style={styles.modalContentContainer}>
          <Text style={styles.modalHeading}>Choose your location</Text>
          <Text style={styles.modalSecondaryHeading}>
            Select a delivery location to see product availability and delivery
            options.
          </Text>
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
});
