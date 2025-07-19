import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View, Modal, RefreshControl, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CourseRegister from './CourseRegisterScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CoursetackParamsList } from '../../navigation/types';
import { ICourseList } from '../../api/types/ICourse';
import { GetAllCourses } from '../../api/services/CourseServices';
import { useNavigation } from '@react-navigation/native';
import CourseCard from '../../components/CourseComponets/CourseCards';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

type CourseNavigationProps = NativeStackNavigationProp<
  CoursetackParamsList,
  'Course'
>;

const Course: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const [courses, setCourses] = useState<ICourseList[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await GetAllCourses();
      console.log('Respuesta cruda del backend:', data);
      const validCourses = Array.isArray(data) ? data : [];
      setCourses(validCourses);
    } catch (error) {
      console.error('Error al obtener courses:', error);
    }
  };

  console.log('courses:', courses);

  const navigation = useNavigation<CourseNavigationProps>();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9CDD0' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40, alignItems: 'center' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.addButton}>
          <Text style={styles.addText}>+ Add Course</Text>
        </Pressable>

        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CourseRegister onClose={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        {courses.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.title}>No courses available</Text>
            <Text style={styles.subtitle}>Please add a course</Text>
          </View>
        ) : (
          courses.map((course) =>
            <CourseCard
              key={course.id_courses}
              data={course}
            />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: '#fff',
    flex: 1,
    backgroundColor: '#F9CDD0',
    alignItems: 'center',
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'web' ? 70 : height * 0.09,
    width: Platform.OS === 'web' ? 320 : width * 0.80,
    marginTop: Platform.OS === 'web' ? 20 : height * 0.03,
    marginBottom: Platform.OS === 'web' ? 15 : height * 0.018,
    borderRadius: 30,
    backgroundColor: '#07BA30',
    borderColor: '#fff',
    borderWidth: 2,
  },
  addText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
  }
});

export default Course;