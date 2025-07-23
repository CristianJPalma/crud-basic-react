import { useEffect, useState } from "react";
import { IInstructorDelete } from "../../api/types/IInstructor";
import { DeleteInstructor } from "../../api/services/InstructorServices";
import { View, Text, Button } from "react-native";
import ReCaptcha from "../../components/ReCaptcha";
import CustomModal from "../../components/CustomModal";

interface Props {
  id_instructor: string;
  onClose?: () => void;
}

const InstructorDelete: React.FC<Props> = ({ id_instructor, onClose }) => {
  const [form, setForm] = useState<IInstructorDelete>({
    instructor: {
      id_instructor: id_instructor,
    },
    recaptchaToken: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      instructor: { ...prev.instructor, id_instructor }
    }));
  }, [id_instructor]);

  const handleChange = (name: string, value: string) => {
    if (name === "id_instructor") {
      setForm({ ...form, instructor: { ...form.instructor, id_instructor: value } });
    } else if (name === "recaptchaToken") {
      setForm({ ...form, recaptchaToken: value });
    }
  };

  const deleteInstructor = async (form: IInstructorDelete) => {
    try {
      console.log("Deleting instructor with ID:", form.instructor.id_instructor);
      const deleteResponse = await DeleteInstructor(form);
      console.log("Response from backend:", deleteResponse);

      setModalMessage(deleteResponse?.message || "Instructor eliminado");
      setModalVisible(true);
    } catch (error) {
      console.error("Error al eliminar el instructor:", error);
      setModalMessage("Error al eliminar el instructor");
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  return (
    <View>
      <Text>¿Estás seguro de que deseas eliminar este instructor?</Text>
      <View style={{ marginTop: 16 }}>
        <ReCaptcha onVerify={(token) => handleChange("recaptchaToken", token)} />
      </View>
      <Button title="Eliminar" onPress={() => deleteInstructor(form)} />
      {onClose && <Button title="Cerrar" onPress={onClose} color="red" />}
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </View>
  );
};

export default InstructorDelete;
