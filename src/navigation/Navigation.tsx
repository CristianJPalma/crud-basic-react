import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/HomeScreen';
import Course from '../screen/CourseScreens/CourseScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Dimensions, Platform, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import Learner from '../screen/LearnerScreens/LearnerScreen';
import Instructor from '../screen/InstructorScreens/InstructorScreen';

type RootTabParamList = {
    Home: undefined;
    Learner: undefined;
    Course: undefined;
    Instructor: undefined;
};

function CustomBackButton() {
    const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 20 }}>
            <MaterialCommunityIcons name="menu" size={35} color="#fff" />
        </TouchableOpacity>
    );
}


const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name='Learner'
                component={Learner}
                options={{
                    headerTitleStyle: {
                        ...styles.headerTitleStyle,
                        fontWeight: 'bold'
                    },
                    headerStyle: [{ ...styles.headerStyle }, { backgroundColor: '#3E444A', borderColor: '#2A2E31' }],
                    headerTitle: '👨‍🎓 Learner',
                    headerTitleAlign: 'center',
                    tabBarStyle: { display: 'none' },
                    headerLeft: () => <CustomBackButton />,
                }}
            />
            <Tab.Screen
                name='Instructor'
                component={Instructor}
                options={{
                    headerTitleStyle: {
                        ...styles.headerTitleStyle,
                        fontWeight: 'bold'
                    },
                    headerStyle: [{ ...styles.headerStyle }, { backgroundColor: '#CC9A06', borderColor: '#8A6B03' }],
                    headerTitle: '👩‍🏫 Instructor',
                    headerTitleAlign: 'center',
                    tabBarStyle: { display: 'none' },
                    headerLeft: () => <CustomBackButton />,
                }}
                />
            <Tab.Screen
                name="Course"
                component={Course}
                options={{
                    headerTitleStyle: {
                        ...styles.headerTitleStyle,
                        fontWeight: 'bold'
                    },
                    headerStyle: [{ ...styles.headerStyle }, { backgroundColor: '#A12832', borderColor: '#7E1F26' }],
                    headerTitle: '📒 Courses',
                    headerTitleAlign: 'center',
                    tabBarStyle: { display: 'none' },
                    headerLeft: () => <CustomBackButton />,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = {
    headerTitleStyle: {
        fontSize: Platform.OS === 'web' ? 45 : width * 0.1,
        color: '#FFFFFF',
    },
    headerStyle: {
        borderWidth: 3,
        height: Platform.OS === 'web' ? 120 : height * 0.15,
    },
};

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}