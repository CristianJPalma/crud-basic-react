import { ScrollView, TextInput, StyleSheet} from "react-native";
import { ILearnerList } from "../../api/types/ILearner";

interface Props {
    form: ILearnerList;
    handleChange: (field: keyof ILearnerList, value: string) => void;
}

const CourseEditForm: React.FC<Props> = ({ form, handleChange }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={form.first_name}
                onChangeText={(text) => handleChange("first_name", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={form.last_name}
                onChangeText={(text) => handleChange("last_name", text)}
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