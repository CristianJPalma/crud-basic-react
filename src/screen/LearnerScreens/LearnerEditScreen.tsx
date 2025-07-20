import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ILearnerList } from "../../api/types/ILearner";
import { EditLearner, GetAllLearner } from "../../api/services/LearnerServices";
import { Alert, Button, View, StyleSheet } from "react-native";
import CustomModal from "../../components/CustomModal";
import LearnerEditForm from "../../components/LearnerComponents/LearnerEditForm";

interface LearnerUpdateProps {
  id_learner: number;
  onClose: () => void;
}

const LearnerUpdate: React.FC<LearnerUpdateProps> = ({ id_learner, onClose }) => {
  const navigation = useNavigation();
  const id = id_learner;

  const [form, setForm] = useState<ILearnerList>({
    id_learner: "",
    first_name: "",
    last_name: "",
    status: 1
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchLearner = async () => {
      const allLearners = await GetAllLearner();
      const found = Array.isArray(allLearners)
        ? allLearners.find((l) => l.id_learner === id)
        : null;
      if (found) setForm(found);
    };
    fetchLearner();
  }, [id]);

  const handleChange = (field: keyof ILearnerList, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleEdit = async () => {
    if (!form.id_learner) {
      Alert.alert("Error", "ID de aprendiz no válido");
      return;
    }
    try {
      const res = await EditLearner(Number(form.id_learner), {
        ...form,
        id_learner: String(form.id_learner)
      });
      setModalMessage(res?.message || "Aprendiz actualizado");
      setModalVisible(true);
    } catch (error) {
      console.error("Error al editar el aprendiz:", error);
      setModalMessage("Error al editar el aprendiz");
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  return (
    <View>
      <LearnerEditForm form={form} handleChange={handleChange} />
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

export default LearnerUpdate;