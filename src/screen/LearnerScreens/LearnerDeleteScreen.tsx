import { useEffect, useState } from "react";
import { ILearnerDelete } from "../../api/types/ILearner";
import { DeleteLearner } from "../../api/services/LearnerServices";
import { View, Text, Button } from "react-native";
import ReCaptcha from "../../components/ReCaptcha";
import CustomModal from "../../components/CustomModal";

interface Props {
  id_learner: string;
  onClose?: () => void;
}

const LearnerDelete: React.FC<Props> = ({ id_learner, onClose }) => {
  const [form, setForm] = useState<ILearnerDelete>({
    learner: {
      id_learner: id_learner,
    },
    recaptchaToken: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      learner: { ...prev.learner, id_learner }
    }));
  }, [id_learner]);

  const handleChange = (name: string, value: string) => {
    if (name === "id_learner") {
      setForm({ ...form, learner: { ...form.learner, id_learner: value } });
    } else if (name === "recaptchaToken") {
      setForm({ ...form, recaptchaToken: value });
    }
  };

  const deleteLearner = async (form: ILearnerDelete) => {
    try {
      console.log("Deleting learner with ID:", form.learner.id_learner);
      const deleteResponse = await DeleteLearner(form);
      console.log("Response from backend:", deleteResponse);

      setModalMessage(deleteResponse?.message || "Aprendiz eliminado");
      setModalVisible(true);
    } catch (error) {
      console.error("Error al eliminar el aprendiz:", error);
      setModalMessage("Error al eliminar el aprendiz");
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  return (
    <View>
      <Text>Are you sure you want to delete this learner?</Text>
      <View style={{ marginTop: 16 }}>
        <ReCaptcha onVerify={(token) => handleChange("recaptchaToken", token)} />
      </View>
      <Button title="Eliminar" onPress={() => deleteLearner(form)} />
      {onClose && <Button title="Cerrar" onPress={onClose} color="red" />}
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </View>
  );
};

export default LearnerDelete;