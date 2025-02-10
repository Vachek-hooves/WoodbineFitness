import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';

const activities = [
  {name: 'Running', icon: '🏃', title: 'Running'},
  {name: 'Strength Training', icon: '💪', title: 'Strength'},
  {name: 'Yoga & Stretching', icon: '🧘', title: 'Yoga'},
  {name: 'Cycling', icon: '🚴', title: 'Cycling'},
  {name: 'Hiking & Walking', icon: '🚶', title: 'Hiking'},
  {name: 'Fitness Workouts', icon: '🔥', title: 'Fitness'},
];

const Plan = ({navigation}) => {
  const handleActivityPress = activity => {
    // Add navigation or activity selection logic here
    console.log('Selected activity:', activity);
    navigation.navigate('PlanWorkout', {activity});
  };

  return (
    <CustomGradient>
      <ScrollView>
        <View style={styles.container}>
          {activities.map(activity => (
            <Pressable
              key={activity.name}
              style={styles.activityButton}
              onPress={() => handleActivityPress(activity.title)}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonText}>
                  {activity.icon} {activity.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </CustomGradient>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '35%',
    gap: 15,
  },
  activityButton: {
    height: 60,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 30,
  },
  buttonInner: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
