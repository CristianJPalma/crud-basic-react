import { ScrollView, TextInput, StyleSheet, Button, View } from "react-native";
import { ICourse } from "../../api/types/ICourse";
import ReCaptcha from "../ReCaptcha";

interface Props {
    form: ICourse;
    handleChange: (field: "course_name" | "status" | "recaptchaToken", value: string) => void;
}

const CourseForm: React.FC<Props> = ({form, handleChange}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={form.course.course_name}
                onChangeText={(text) => handleChange("course_name", text)}
            />
            <View style={{ marginTop: 16 }}>
                <ReCaptcha
                    onVerify={(token) => handleChange("recaptchaToken", token)}
                />
            </View>
        </ScrollView>
    )
}

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

export default CourseForm;