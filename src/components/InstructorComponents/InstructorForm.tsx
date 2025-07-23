import { ScrollView, TextInput, StyleSheet, View } from "react-native";
import ReCaptcha from "../ReCaptcha";
import { IInstructor } from "../../api/types/IInstructor";

interface Props {
    form: IInstructor;
    handleChange: (field: "first_name" | "last_name" | "status" | "recaptchaToken", value: string) => void;
}

const InstructorForm: React.FC<Props> = ({ form, handleChange }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={form.instructor.first_name}
                onChangeText={(text) => handleChange("first_name", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={form.instructor.last_name}
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

export default InstructorForm;