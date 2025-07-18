import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ICourse } from '../../api/types/ICourse';
import { useState } from 'react';
import { CreateCourse } from '../../api/services/CourseServices';
import CourseForm from '../../components/CourseForm';
import CustomModal from '../../components/CustomModal';

interface Props {
  onClose?: () => void;
}

const CourseRegister: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState<ICourse>({
    course: {
      id_courses: "",
      course_name: "",
      status: 1
    },
    recaptchaToken: ""
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (name: string, value: string) => {
    if (name === "course_name" || name === "status" || name === "id_courses") {
      setForm({ ...form, course: { ...form.course, [name]: value } });
    } else if (name === "recaptchaToken") {
      setForm({ ...form, recaptchaToken: value });
    }
  };

  const registerCourse = async () => {
    try {
      console.log('Datos a enviar:', form);
      const register = await CreateCourse(form);
      console.log('Respuesta del backend:', register);

      setModalMessage(register?.message || "Curso registrado");
      setModalVisible(true);

    } catch (error) {
      console.error('Error al guardar:', error);
      setModalMessage('Error al guardar el curso');
      setModalVisible(true);
    }
  };

  return (
    <View>
      <CourseForm form={form} handleChange={handleChange} />
      <Button title="Save" onPress={registerCourse} />
      {onClose && <Button title="Close" onPress={onClose} color="red" />}
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default CourseRegister;
