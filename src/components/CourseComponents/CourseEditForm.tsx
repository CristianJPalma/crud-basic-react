import { ScrollView, TextInput, StyleSheet, View } from "react-native";
import { ICourseList } from "../../api/types/ICourse";

interface Props {
    form: ICourseList;
    handleChange: (field: keyof ICourseList, value: string) => void;
}

const CourseEditForm: React.FC<Props> = ({ form, handleChange }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={form.course_name}
                onChangeText={(text) => handleChange("course_name", text)}
            />
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

export default CourseEditForm;