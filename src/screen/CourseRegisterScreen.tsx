import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ICourse } from '../api/types/ICourse';
import { useState } from 'react';
import { CreateCourse } from '../api/services/CourseServices';
import CourseForm from '../components/CourseForm';

const CourseRegister = () => {
  const [form, setForm] = useState<ICourse>({
        course: {
            id_courses: "",
            course_name: "",
            status: ""
        },
        recaptchaToken: ""
  });

  const handleChange = (name: string, value: string)=> {
    if (name === "course_name" || name === "status") {
      setForm({...form, course: {...form.course, [name]: value}});
    } else if (name === "recaptchaToken") {
      setForm({...form, recaptchaToken: value});
    }
  }
  const registerCourse = async () => {
    const register = await CreateCourse(form);
  };
  return (
    <View>
      <CourseForm form={form} handleChange={handleChange} />
      
      <Button title= "Save" onPress={registerCourse} />
    </View>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default CourseRegister;