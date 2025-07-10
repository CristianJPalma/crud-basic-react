import { ScrollView, TextInput, StyleSheet, Button} from "react-native";
import { ICourse } from "../api/types/ICourse";
import ReCaptcha from 'react-native-recaptcha-v2';
interface Props {
    form: ICourse;
    handleChange: (field: "course_name" | "status" | "recaptchaToken", value: string) => void;
}
const SITE_KEY = '6LeADR4rAAAAAD0c9CIg4-8uRh6jMAnHzJTyzfzq';
const BASE_URL = 'http://localhost';
const CourseForm: React.FC<Props> = ({form, handleChange}) => {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput style={styles.input}
                placeholder="Course Name"
                value={form.course.course_name}
                onChangeText={(text) => handleChange("course_name", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Status"
                value={form.course.status}
                onChangeText={(text) => handleChange("status", text)}
                keyboardType="numeric"
            />
            <Button title="Verificar reCAPTCHA" onPress={() => recaptcha.current.open()} />
            <Recaptcha
              ref={recaptcha}
              siteKey={SITE_KEY}
              baseUrl={BASE_URL}
              onVerify={handleVerify}
              size="normal" // también puede ser 'invisible'
            />
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