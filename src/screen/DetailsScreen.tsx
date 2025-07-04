import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Details(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a El details</Text>
            <Text style={styles.text}>detalles</Text>
            <Text style={styles.text}>Mas detalles</Text>
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