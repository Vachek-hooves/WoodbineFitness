import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import MainLayout from '../../components/Layout/MainLayout';

const activities = ['Running', 'Cycling', 'Hiking', 'Fitness', 'Yoga'];

const Statistic = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Goal'); // Goal or TrainUp
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleTabPress = tab => {
    setActiveTab(tab);
    setSelectedActivity(null); // Reset selection when switching tabs
  };

  const handleActivitySelect = activity => {
    setSelectedActivity(activity);
  };

  const handleBegin = () => {
    if (activeTab === 'Goal') {
      navigation.navigate('StatisticGoal', {
        activity: selectedActivity,
      });
    } else {
      navigation.navigate('StatisticTrain', {
        activity: selectedActivity,
      });
    }
  };

  return (
    <CustomGradient>
      <MainLayout>
        <View style={styles.container}>
          <ScrollView>
            {/* Top Tabs */}
            <View style={styles.tabContainer}>
              <Pressable
                style={[
                  styles.tabButton,
                  activeTab === 'Goal' && styles.activeTabButton,
                ]}
                onPress={() => handleTabPress('Goal')}>
                <View style={styles.innerBorder}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'Goal' && styles.activeTabText,
                    ]}>
                    Goal
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={[
                  styles.tabButton,
                  activeTab === 'TrainUp' && styles.activeTabButton,
                ]}
                onPress={() => handleTabPress('TrainUp')}>
                <View style={styles.innerBorder}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'TrainUp' && styles.activeTabText,
                    ]}>
                    TrainUp
                  </Text>
                </View>
              </Pressable>
            </View>

            <Text style={styles.title}>Choose your activity type!</Text>

            {/* Activities Container */}
            <View style={styles.activitiesContainer}>
              <Text style={styles.activitiesTitle}>Activities</Text>
              {activities.map(activity => (
                <Pressable
                  key={activity}
                  style={[
                    styles.activityButton,
                    selectedActivity === activity &&
                      styles.activeActivityButton,
                  ]}
                  onPress={() => handleActivitySelect(activity)}>
                  <View style={styles.innerBorder}>
                    <Text
                      style={[
                        styles.activityText,
                        selectedActivity === activity &&
                          styles.activeActivityText,
                      ]}>
                      {activity}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* Begin Button */}
            {selectedActivity && (
              <Pressable style={styles.beginButton} onPress={handleBegin}>
                <View style={styles.innerBorder}>
                  <Text style={styles.beginText}>Begin</Text>
                </View>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </MainLayout>
    </CustomGradient>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  tabButton: {
    width: 150,
    height: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
  },
  activeTabButton: {
    backgroundColor: '#FF0000',
  },
  innerBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  activitiesContainer: {
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 20,
    padding: 20,
    gap: 15,
  },
  activitiesTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  activityButton: {
    height: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
  },
  activeActivityButton: {
    backgroundColor: '#FF0000',
  },
  activityText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: '500',
  },
  activeActivityText: {
    color: 'white',
  },
  beginButton: {
    // position: 'absolute',
    // bottom: 100,
    // left: 20,
    // right: 20,
    height: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    marginTop: 60,
  },
  beginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
