import { Dimensions, View, Text, TouchableOpacity, Modal, Platform, StyleSheet } from "react-native";
import { IInstructorList } from "../../api/types/IInstructor";
import React, { useState } from "react";
import InstructorDelete from "../../screen/InstructorScreens/InstructorDeleteScreen";
import InstructorUpdate from "../../screen/InstructorScreens/InstructorEditScreen";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props {
  data: IInstructorList;
}

const InstructorCard: React.FC<Props> = ({ data }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  if (!data) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Text style={{ color: "#CC9A06" }}>Id:</Text> {data.id_instructor}
      </Text>
      <Text style={styles.title}>
        <Text style={{ color: "#CC9A06" }}>First Name:</Text> {data.first_name}
      </Text>
      <Text style={styles.title}>
        <Text style={{ color: "#CC9A06" }}>Last Name:</Text> {data.last_name}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonEdit} onPress={() => setEditModalVisible(true)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={() => setDeleteModalVisible(true)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={deleteModalVisible}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{data.id_instructor}</Text>
            <InstructorDelete
              id_instructor={data.id_instructor}
              onClose={() => setDeleteModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={editModalVisible}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <InstructorUpdate
              id_instructor={Number(data.id_instructor)}
              onClose={() => setEditModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    width: Platform.OS === "web" ? 330 : screenWidth * 0.84,
    padding: Platform.OS === "web" ? 16 : screenWidth * 0.04,
    margin: Platform.OS === "web" ? 8 : screenWidth * 0.02,
    borderRadius: Platform.OS === "web" ? 20 : screenWidth * 0.05,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: Platform.OS === "web" ? 18 : screenWidth * 0.045,
    fontWeight: "bold",
    marginBottom: Platform.OS === "web" ? 6 : screenWidth * 0.015,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: Platform.OS === "web" ? 12 : screenHeight * 0.015,
    justifyContent: "space-between",
  },
  buttonEdit: {
    backgroundColor: "#EEB71F",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Platform.OS === "web" ? 100 : screenWidth * 0.25,
    height: Platform.OS === "web" ? 40 : screenHeight * 0.05,
    borderColor: "#000000",
    borderRadius: Platform.OS === "web" ? 8 : screenWidth * 0.02,
  },
  buttonDelete: {
    backgroundColor: "#ff4d4d",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Platform.OS === "web" ? 100 : screenWidth * 0.25,
    height: Platform.OS === "web" ? 40 : screenHeight * 0.05,
    borderColor: "#000000",
    borderRadius: Platform.OS === "web" ? 8 : screenWidth * 0.02,
  },
  buttonText: {
    color: "#fff",
    fontSize: Platform.OS === "web" ? 18 : screenWidth * 0.045,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400
  },
});

export default InstructorCard;
