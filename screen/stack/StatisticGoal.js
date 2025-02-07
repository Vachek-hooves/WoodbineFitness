import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';

const StatisticGoal = ({ route }) => {
  const { activity } = route.params;

  return (
    <CustomGradient>
      <View style={styles.container}>
        <Text style={styles.title}>{activity} Goals</Text>
        {/* Add your goal-specific content here */}
      </View>
    </CustomGradient>
  );
};

export default StatisticGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});