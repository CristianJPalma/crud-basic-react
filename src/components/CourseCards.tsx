import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CoursetackParamsList } from "../navigation/types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ICourse } from "../api/types/ICourse";

interface Props {
    data: ICourse;
}

const CourseCard: React.FC<Props> = ({ data }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<CoursetackParamsList>>();

    // const handlePress = () => {
    //     navigation.navigate("Course", {id: data.id_courses.toString()});
    // };

    // const handleDelete = () => {
    //     const registro = await DeleteCourse(data.id_courses);
    //     console.log('Registro eliminado:', registro);
    // };
    // Validación para evitar errores si falta información
    if (!data || !data.course) {
        return null;
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>ID: {data.course.id_courses}</Text>
            <Text style={styles.text}>Nombre: {data.course.course_name}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonEdit}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDelete}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f8f8f8",
        padding: 16,
        margin: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "space-between",
    },
    buttonEdit: {
        backgroundColor: "#1e90ff",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonDelete: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CourseCard;