import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, Text, View,  } from 'react-native';
import { CoursetackParamsList } from '../navigation/types';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



type CourseScreenNavigationProp = NativeStackNavigationProp<
  CoursetackParamsList,
  "Course"
>;
export default function Home(){
    const navigation = useNavigation<CourseScreenNavigationProp>();
    return(
        <View style={styles.container}>
          <Text style={styles.titleTop}>----SENA----</Text>
          <Text style={styles.secondText}>Select an entity</Text>
            <Pressable
              onPress={() => navigation.navigate("Course")}
              style={styles.buttons}>
            <Text style={styles.textButton}>📄 Enrollment</Text>
            </Pressable>
                        <Pressable
              onPress={() => navigation.navigate("Course")}
              style={styles.buttons}>
            <Text style={styles.textButton}>👨‍🎓 Learner</Text>
            </Pressable>
                        <Pressable
              onPress={() => navigation.navigate("Course")}
              style={styles.buttons}>
            <Text style={styles.textButton}>👩‍🏫 Instructor</Text>
            </Pressable>
                        <Pressable
              onPress={() => navigation.navigate("Course")}
              style={styles.buttons}>
            <Text style={styles.textButton}>📒 Course</Text>
            </Pressable>
                        <Pressable
              onPress={() => navigation.navigate("Course")}
              style={styles.buttons}>
            <Text style={styles.textButton}>📅 Scheldule</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    )   
}
const styles = StyleSheet.create({
  titleTop: {
    fontWeight: 'bold',
    color: '#0D6EFD',
    marginTop:  Platform.OS === 'web' ? 50 : height * 0.06,        // 6% del alto
    fontSize: Platform.OS === 'web' ? 64 : width * 0.12,          // 12% del ancho
    textAlign: 'center',
  },
  secondText: {
    fontWeight: 'bold',
    color: '#AEAEAE',
    fontSize:  Platform.OS === 'web' ? 25 : width * 0.06,          // 6% del ancho
    marginTop: height * 0.01,        // 1% del alto
    textAlign: 'center',
  },
buttons: {
    marginTop: Platform.OS === 'web' ? 20 : height * 0.03,
    borderRadius: Platform.OS === 'web' ? 8 : width * 0.025,
    width: Platform.OS === 'web' ? 300 : width * 0.85,
    height: Platform.OS === 'web' ? 70 : height * 0.1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  textButton: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 36 : width * 0.07,          // 7% del ancho
  },
  container: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
