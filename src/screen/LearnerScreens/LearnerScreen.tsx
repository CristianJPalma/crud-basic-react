import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { LearnerParamsList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Text, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Modal, View} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { GetAllLearner } from "../../api/services/LearnerServices";
import { ILearnerList } from "../../api/types/ILearner";
import LearnerRegisterScreen from "./LearnerRegisterScreen";
import LearnerCard from "../../components/LearnerComponents/LearnerCards";

const { width, height } = Dimensions.get('window');

type LearnerNavigationProps = NativeStackNavigationProp<
  LearnerParamsList,
  'Learner'
  >;


const Learner: React.FC = () => {

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchLearners();
  }, []);

  const [learners, setLearners] = useState<ILearnerList[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLearners();
    setRefreshing(false);
  }, []);

    const fetchLearners = async () => {
      try {
        const data = await GetAllLearner();
        console.log('Respuesta cruda del backend:', data);
        const validLearners = Array.isArray(data) ? data : [];
        setLearners(validLearners);
      } catch (error) {
        console.error('Error fetching learners:', error);
      }
    }
    const navigation = useNavigation<LearnerNavigationProps>();
    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D6D8DA' }}>
        <ScrollView
        style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 40, alignItems: 'center' }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addButton}>
            <Text style={styles.addText}>+ Add Learner</Text>
          </Pressable>

          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            transparent={true}
            
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <LearnerRegisterScreen onClose={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>

          {learners.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.title}>No learners available</Text>
            <Text style={styles.subtitle}>Please add a learner</Text>
          </View>
          ): (
            learners.map((learner) => (
              <LearnerCard key={learner.id_learner} data={learner} />
            ))
          )}
        </ScrollView>
    </SafeAreaView>
    );
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
export default Learner;