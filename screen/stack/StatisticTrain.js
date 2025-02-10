import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import { trainUpData } from '../../data/trainUp';

const StatisticTrain = ({ route }) => {
  const { activity } = route.params;
  const activityData = trainUpData[activity];

  const renderLevelDetails = (level, details) => {
    return (
      <View key={level} style={styles.levelContainer}>
        <View style={styles.checkmarkRow}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.levelTitle}>
            {level} – {details.title} 
            {details.duration && ` (${details.duration})`}
          </Text>
        </View>
        
        {details.steps?.map((step, index) => (
          <Text key={index} style={styles.stepText}>
            • {step}
          </Text>
        ))}
        
        {details.tip && (
          <Text style={styles.stepText}>• Tip: {details.tip}</Text>
        )}
      </View>
    );
  };

  return (
    <CustomGradient>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{activity.toUpperCase()}</Text>
        </View>
        
        <ScrollView style={styles.contentContainer}>
          {Object.entries(activityData.levels).map(([level, details]) => 
            renderLevelDetails(level, details)
          )}
        </ScrollView>
      </View>
    </CustomGradient>
  );
};

export default StatisticTrain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  levelContainer: {
    marginBottom: 40,
  },
  checkmarkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  checkmark: {
    color: '#4CAF50', // Green color for checkmark
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
  },
  levelTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  stepText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 24,
    marginBottom: 4,
    lineHeight: 20,
  },
});