import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { CoursetackParamsList } from "../../navigation/types";
import { useEffect, useState } from "react";
import { ICourseList } from "../../api/types/ICourse";
import { EditCourse, GetAllCourses } from "../../api/services/CourseServices";
import { View, Button, Alert, StyleSheet } from "react-native";
import CourseEditForm from "../../components/CourseComponents/CourseEditForm"; // <-- Cambia el import
import CustomModal from "../../components/CustomModal";

type DetailsRouteProp = RouteProp<CoursetackParamsList, "CourseUpdate">;
interface CourseUpdateProps {
    id_courses: number;
    onClose: () => void;
}

const CourseUpdate: React.FC<CourseUpdateProps> = ({ id_courses, onClose }) => {
    let id = id_courses;

    const navigation = useNavigation();
    const [form, setForm] = useState<ICourseList>({
        id_courses: "",
        course_name: "",
        status: 1
    });

        const [modalVisible, setModalVisible] = useState(false);
        const [modalMessage, setModalMessage] = useState("");
        
    useEffect(() => {
        // Cargar datos del curso a editar
        const fetchCourse = async () => {
            const allCourses = await GetAllCourses();
            const found = Array.isArray(allCourses)
                ? allCourses.find((c) => c.id_courses === id)
                : null;
            if (found) setForm(found);
        };
        fetchCourse();
    }, [id]);

    const handleChange = (field: keyof ICourseList, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleEdit = async () => {
        if (!form.id_courses) {
            Alert.alert("Error", "ID de curso no válido");
            return;
        }
        try {
            const res = await EditCourse(Number(form.id_courses), {
                ...form,
                id_courses: String(form.id_courses)
            });
            setModalMessage(res?.message);
            setModalVisible(true);
        } catch (error) {
            console.error("Error al editar el curso:", error);
            setModalMessage('Error al editar el curso');
            setModalVisible(true);
        }
    };
    const handleModalClose = () => {
        setModalVisible(false);
        if (onClose) onClose();
    };
    return (
        <View>
            <CourseEditForm form={form} handleChange={handleChange} />
            <Button title="Guardar cambios" onPress={handleEdit} />
            <CustomModal
                visible={modalVisible}
                message={modalMessage}
                onClose={handleModalClose}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default CourseUpdate;