import { ScrollView, TextInput, StyleSheet, View } from "react-native";
import { ILearner } from "../../api/types/ILearner";
import ReCaptcha from "../ReCaptcha";

interface Props {
    form: ILearner;
    handleChange: (field: "first_name" | "last_name" | "status" | "recaptchaToken", value: string) => void;
}

const LearnerForm: React.FC<Props> = ({ form, handleChange }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={form.learner.first_name}
                onChangeText={(text) => handleChange("first_name", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={form.learner.last_name}
                onChangeText={(text) => handleChange("last_name", text)}
            />
            <View style={{ marginTop: 16 }}>
                <ReCaptcha
                    onVerify={(token) => handleChange("recaptchaToken", token)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
});

export default LearnerForm;