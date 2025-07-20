import { useState } from "react";
import { ILearner } from "../../api/types/ILearner";
import { CreateLearner } from "../../api/services/LearnerServices";
import { Button, View, StyleSheet} from "react-native";
import LearnerForm from "../../components/LearnerComponents/LearnerForm";
import CustomModal from "../../components/CustomModal";

interface Props {
  onClose?: () => void;
}

const learnerRegister: React.FC<Props> = ({ onClose }) => {

    const [form, setForm] = useState<ILearner>({
        learner: {
            id_learner: "",
            first_name: "",
            last_name: "",
            status: 1
        },
        recaptchaToken: ""
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleChange = (field: "first_name" | "last_name" | "status" | "recaptchaToken", value: string) => {
        if (field === "first_name" || field === "last_name" || field === "status") {
            setForm({ ...form, learner: { ...form.learner, [field]: value } });
        } else if (field === "recaptchaToken") {
            setForm({ ...form, recaptchaToken: value });
        }
    };
    const registerLearner = async () => {
        try {
            console.log('Datos a enviar:', form);
            const register = await CreateLearner(form);
            console.log('Respuesta del backend:', register);

            setModalMessage(register?.message || "Learner registered");
            setModalVisible(true);
        }
        catch (error) {
            console.error('Error al guardar:', error);
            setModalMessage('Error al guardar el aprendiz');
            setModalVisible(true);
        }
    }

    return (
        <View>
            <LearnerForm form={form} handleChange={handleChange} />
            <Button title="Save" onPress={registerLearner} />
            {onClose && <Button title="Close" onPress={onClose} color="red" />}
            <CustomModal
                visible={modalVisible}
                message={modalMessage}
                onClose={() => setModalVisible(false)}
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

export default learnerRegister;