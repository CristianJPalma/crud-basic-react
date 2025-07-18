import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CoursetackParamsList } from "../navigation/types";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Modal, } from "react-native";
import { ICourseList } from "../api/types/ICourse";
import { useState } from "react";
import CourseDelete from "../screen/CourseScreens/CourseDeleteScreen";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props {
    data: ICourseList;
}

const CourseCard: React.FC<Props> = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation =
        useNavigation<NativeStackNavigationProp<CoursetackParamsList>>();

    if (!data) return null;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                <Text style={{ color: "#CA3240" }}>Id:</Text> {data.id_courses}
            </Text>
            <Text style={styles.title}>
                <Text style={{ color: "#CA3240" }}>Course Name:</Text>{" "}
                {data.course_name}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonEdit} >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDelete} onPress={() => setModalVisible(true)} >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{data.id_courses}</Text>
                        <CourseDelete
                            id_courses={data.id_courses} 
                            onClose={() => setModalVisible(false)}
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
    text: {
        fontSize: Platform.OS === "web" ? 14 : screenWidth * 0.035,
        color: "#333",
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

export default CourseCard;
