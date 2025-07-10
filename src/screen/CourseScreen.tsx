import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { CoursetackParamsList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type CourseRegisterScreenNavigationProp = NativeStackNavigationProp<
  CoursetackParamsList,
  "CourseRegister"
>;
const { width, height } = Dimensions.get('window');
export default function Course(){
  const navigation = useNavigation<CourseRegisterScreenNavigationProp>();
    return(
        <View style={styles.container}>
          <Pressable 
            onPress={() => navigation.navigate("CourseRegister")}          
            style={styles.addButton}>
            <Text style={styles.addText}>+ Add Course</Text>
          </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    color: '#fff',
    flex: 1,
    backgroundColor: '#F9CDD0',
    alignItems: 'center',
  },
  addButton:{
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'web' ? 50 : height * 0.20,
    width: Platform.OS === 'web' ? 200 : width * 0.42,
    borderRadius: 30,
    backgroundColor: 'green'
  },
  addText:{
    color: '#fff'
  }
});