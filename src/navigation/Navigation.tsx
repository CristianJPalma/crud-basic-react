import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/HomeScreen';
import Details from '../screen/DetailsScreen';
import Course from '../screen/CourseScreen';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const StackNavigation = createNativeStackNavigator()

function MyStack(){
    return(
        <StackNavigation.Navigator initialRouteName='Home'>
            <StackNavigation.Screen name="Course" component={Course}/>
        </StackNavigation.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}
            options={
                {
                    headerShown: false,
                    tabBarStyle:{display: 'none'},
                }
            }/>
            <Tab.Screen name="Enrollment" component={Details}            
            options={
                {
   
                tabBarStyle:{display: 'none'},
                }
            }/>
            <Tab.Screen name="Course" component={Course}
            options={{
                headerTitleStyle: { 
                    ...styles.headerTitleStyle, 
                    fontWeight: 'bold' 
                },
                headerStyle: { ...styles.headerStyle },
                headerTitle: '📄 Enrollment',
                headerTitleAlign: 'center',
                tabBarStyle: { display: 'none' },
            }}/>
        </Tab.Navigator>
    )
}
const styles = {
        headerTitleStyle: {
        fontSize: Platform.OS === 'web' ? 45 : width * 0.1,
        color: '#FFFFFF',
        
        },
        headerStyle: {
        borderColor:'#063C85',
        borderWidth: 3,
        height: Platform.OS === 'web' ? 120 : height * 0.15,
        backgroundColor: '#004AAD',
        },
    
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}