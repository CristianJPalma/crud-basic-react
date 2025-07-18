import { Button, View, Text } from "react-native";
import { DeleteCourse } from "../../api/services/CourseServices";
import { ICourseDelete } from "../../api/types/ICourse";
import ReCaptcha from "../../components/ReCaptcha";
import { useState, useEffect } from "react";
import CustomModal from "../../components/CustomModal"; // Asegúrate de tener este componente

interface Props {
    id_courses: string;
    onClose?: () => void;
}

const CourseDelete: React.FC<Props> = ({ id_courses, onClose }) => {
    const [form, setForm] = useState<ICourseDelete>({
        course: {
            id_courses: id_courses
        },
        recaptchaToken: ""
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            course: { ...prev.course, id_courses }
        }));
    }, [id_courses]);

    const handleChange = (name: string, value: string) => {
        if (name === "id_courses") {
            setForm({ ...form, course: { ...form.course, id_courses: value } });
        } else if (name === "recaptchaToken") {
            setForm({ ...form, recaptchaToken: value });
        }
    };

    const deleteCourse = async (form: ICourseDelete) => {
        try {
            console.log('Deleting course with ID:', form.course.id_courses);
            const deleteResponse = await DeleteCourse(form);
            console.log('Response from backend:', deleteResponse);

            setModalMessage(deleteResponse?.message);
            setModalVisible(true);
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
            setModalMessage('Error al eliminar el curso');
            setModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (onClose) onClose();
    };

    return (
        <View>
            <Text>Are you sure you want to delete this course?</Text>
            <View style={{ marginTop: 16 }}>
                <ReCaptcha
                    onVerify={(token) => handleChange("recaptchaToken", token)}
                />
            </View>
            <Button title="Delete" onPress={() => deleteCourse(form)} />
            {onClose && <Button title="Close" onPress={onClose} color="red" />}
            <CustomModal
                visible={modalVisible}
                message={modalMessage}
                onClose={handleModalClose}
            />
        </View>
    );
};

export default CourseDelete;