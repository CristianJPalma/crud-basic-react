import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, Modal, Pressable, RefreshControl, SafeAreaView, ScrollView, View, Text, Platform, StyleSheet } from "react-native";
import { InstructorParamsList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { IInstructorList } from "../../api/types/IInstructor";
import { GetAllInstructor } from "../../api/services/InstructorServices";
import InstructorRegisterScreen from "./InstructorRegisterScreen";
import InstructorCard from "../../components/InstructorComponents/InstructorCards";

const { width, height } = Dimensions.get('window');

type InstructorNavigationProps = NativeStackNavigationProp<
  InstructorParamsList,
  'Instructor'
>;
const Instructor: React.FC = () => {
  
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
      fetchInstructors();
    }, []);

    const [instructors, setInstructor] = useState<IInstructorList[]>([]);
  
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await fetchInstructors();
      setRefreshing(false);
    }, []);

    const fetchInstructors = async () => {
      try {
        const data = await GetAllInstructor();
        console.log('Respuesta cruda del backend:', data);
        const validLearners = Array.isArray(data) ? data : [];
        setInstructor(validLearners);
      } catch (error) {
        console.error('Error fetching learners:', error);
      }
    }

    const navigation = useNavigation<InstructorNavigationProps>();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF3CD' }}>
          <ScrollView
            style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 40, alignItems: 'center' }}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.addButton}>
              <Text style={styles.addText}>+ Add Instructor</Text>
            </Pressable>

            <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            transparent={true}
            
            >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <InstructorRegisterScreen onClose={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>

          {instructors.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.title}>No instructors available</Text>
            <Text style={styles.subtitle}>Please add a instructor</Text>
          </View>
          ): (
            instructors.map((instructor) => (
              <InstructorCard key={instructor.id_instructor} data={instructor} />
            ))
          )}
          </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
  })
export default Instructor;