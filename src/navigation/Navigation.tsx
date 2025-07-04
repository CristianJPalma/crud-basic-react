import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/HomeScreen';
import Details from '../screen/DetailsScreen';
import Course from '../screen/CourseScreen';
import { NavigationContainer } from '@react-navigation/native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
            <Tab.Screen name="Course" component={Course}
            options={
                {
                    tabBarIcon:({size, color}) => (
                        <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
                    )
                }
            }/>
            <Tab.Screen name="Details" component={Details}            
            options={
                {
                    tabBarIcon:({size, color}) => (
                        <MaterialCommunityIcons name="details" size={24} color="black" />
                    )
                }
            }/>
        </Tab.Navigator>
    )
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}