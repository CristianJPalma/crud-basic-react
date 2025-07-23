import { useState } from "react";
import { IInstructor } from "../../api/types/IInstructor";
import { CreateInstructor } from "../../api/services/InstructorServices";
import { Button, View, StyleSheet } from "react-native";
import InstructorForm from "../../components/InstructorComponents/InstructorForm";
import CustomModal from "../../components/CustomModal";

interface Props {
  onClose?: () => void;
}

const InstructorRegister: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState<IInstructor>({
    instructor: {
      id_instructor: "",
      first_name: "",
      last_name: "",
      status: 1,
    },
    recaptchaToken: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (
    field: "first_name" | "last_name" | "status" | "recaptchaToken",
    value: string
  ) => {
    if (field === "first_name" || field === "last_name" || field === "status") {
      setForm({ ...form, instructor: { ...form.instructor, [field]: value } });
    } else if (field === "recaptchaToken") {
      setForm({ ...form, recaptchaToken: value });
    }
  };

  const registerInstructor = async () => {
    try {
      console.log("Datos a enviar:", form);
      const register = await CreateInstructor(form);
      console.log("Respuesta del backend:", register);

      setModalMessage(register?.message || "Instructor registrado");
      setModalVisible(true);
    } catch (error) {
      console.error("Error al guardar:", error);
      setModalMessage("Error al guardar el instructor");
      setModalVisible(true);
    }
  };

  return (
    <View>
      <InstructorForm form={form} handleChange={handleChange} />
      <Button title="Guardar" onPress={registerInstructor} />
      {onClose && <Button title="Cerrar" onPress={onClose} color="red" />}
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

export default InstructorRegister;
