import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, Text, View,  } from 'react-native';
import { CoursetackParamsList, LearnerParamsList } from '../navigation/types';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



type CourseScreenNavigationProp = NativeStackNavigationProp<
  CoursetackParamsList,
  "Course"
>;
type LearnerScreenNavigationProp = NativeStackNavigationProp<
  LearnerParamsList,
  "Learner"
>;
export default function Home(){
    const navigation = useNavigation<CourseScreenNavigationProp>();
    const navigationLearner = useNavigation<LearnerScreenNavigationProp>();
    return(
        <View style={styles.container}>
          <Text style={styles.titleTop}>----SENA----</Text>
          <Text style={styles.secondText}>Select an entity</Text>
            <Pressable
              onPress={() => navigation.navigate("Course")}
              style={[styles.buttons, { backgroundColor: '#0D6EFD', borderColor: '#0057D7', borderWidth: 3 }]}>
              <Text style={styles.textButton}>📄 Enrollment</Text>
            </Pressable>

            <Pressable
              onPress={() => navigationLearner.navigate("Learner")}
              style={[styles.buttons,{ backgroundColor: '#6C757D', borderColor: '#545C63', borderWidth: 3 }]}>
            <Text style={styles.textButton}>👨‍🎓 Learner</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Course")}
              style={[styles.buttons, { backgroundColor: '#FFC107', borderColor: '#DEA806', borderWidth: 3}]}>
            <Text style={styles.textButton}>👩‍🏫 Instructor</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Course")}
              style={[styles.buttons, { backgroundColor: '#DC3545', borderColor: '#CA3240', borderWidth: 3 }]}>
            <Text style={styles.textButton}>📒 Course</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Course")}
              style={[styles.buttons, { backgroundColor: '#198754', borderColor: '#18794C', borderWidth: 3 }]}>
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
    marginTop:  Platform.OS === 'web' ? 0 : height * 0.06,        // 6% del alto
    fontSize: Platform.OS === 'web' ? 64 : width * 0.15,          // 12% del ancho
    textAlign: 'center',
  },
  secondText: {
    fontWeight: 'bold',
    color: '#AEAEAE',
    fontSize:  Platform.OS === 'web' ? 25 : width * 0.06,          // 6% del ancho
    marginTop: height * 0.03,        // 1% del alto
    textAlign: 'center',
  },
buttons: {
    marginTop: Platform.OS === 'web' ? 20 : height * 0.04,
    borderRadius: Platform.OS === 'web' ? 8 : width * 0.025,
    width: Platform.OS === 'web' ? 300 : width * 0.85,
    height: Platform.OS === 'web' ? 70 : height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  textButton: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 32 : width * 0.07,          // 7% del ancho
  },
  container: {
    borderRadius: Platform.OS === 'web' ? 20 : width * 0.08,
    borderColor: '#E0E0E0',
    borderWidth: 10,

    backgroundColor: '#FAFAFA',
    flex: 1,
    alignItems: 'center',
    justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start',
  },
});
