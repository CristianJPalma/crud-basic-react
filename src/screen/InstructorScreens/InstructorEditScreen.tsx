import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IInstructorList } from "../../api/types/IInstructor";
import { EditInstructor, GetAllInstructor } from "../../api/services/InstructorServices";
import { Alert, Button, View, StyleSheet } from "react-native";
import CustomModal from "../../components/CustomModal";
import InstructorEditForm from "../../components/InstructorComponents/InstructorEditForm";

interface InstructorUpdateProps {
  id_instructor: number;
  onClose: () => void;
}

const InstructorUpdate: React.FC<InstructorUpdateProps> = ({ id_instructor, onClose }) => {
  const navigation = useNavigation();
  const id = id_instructor;

  const [form, setForm] = useState<IInstructorList>({
    id_instructor: "",
    first_name: "",
    last_name: "",
    status: 1
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchInstructor = async () => {
      const allInstructors = await GetAllInstructor();
      const found = Array.isArray(allInstructors)
        ? allInstructors.find((i) => i.id_instructor === id)
        : null;
      if (found) setForm(found);
    };
    fetchInstructor();
  }, [id]);

  const handleChange = (field: keyof IInstructorList, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleEdit = async () => {
    if (!form.id_instructor) {
      Alert.alert("Error", "ID de instructor no válido");
      return;
    }
    try {
      const res = await EditInstructor(Number(form.id_instructor), {
        ...form,
        id_instructor: String(form.id_instructor)
      });
      setModalMessage(res?.message || "Instructor actualizado");
      setModalVisible(true);
    } catch (error) {
      console.error("Error al editar el instructor:", error);
      setModalMessage("Error al editar el instructor");
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  return (
    <View>
      <InstructorEditForm form={form} handleChange={handleChange} />
      <Button title="Guardar cambios" onPress={handleEdit} />
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={handleModalClose}
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

export default InstructorUpdate;
