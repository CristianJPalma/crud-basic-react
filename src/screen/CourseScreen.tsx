import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
export default function Course(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a los cursos</Text>
            <Text style={styles.text}>cursos</Text>
            <Text style={styles.text}>Mas cursos</Text>
            <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    color: '#fff',
    flex: 1,
    backgroundColor: '#2c2d2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#fff'
  }
});