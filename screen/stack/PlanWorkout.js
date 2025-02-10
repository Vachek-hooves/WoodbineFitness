import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import {getWorkoutPlan} from '../../data/workoutPlan';
import { activityAdvices } from '../../data/activityAdvices';

const PlanWorkout = ({route, navigation}) => {
  const {activity} = route.params;
  const {title, name} = activity;
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [selectedPhases, setSelectedPhases] = useState([]);
  console.log(selectedPhases);

  useEffect(() => {
    const plan = getWorkoutPlan(title);
    setWorkoutPlan(plan);
    // Reset selections when activity changes
    setSelectedPhases([]);
  }, [title]);

  const togglePhase = index => {
    setSelectedPhases(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index].sort((a, b) => a - b);
      }
    });
  };

  const handleStartFlow = () => {
    if (selectedPhases.length === 0) {
      // Optionally add an alert here to inform user they need to select at least one phase
      return;
    }
    // Filter only selected phases and navigate to timer
    const selectedWorkout = selectedPhases.map(
      index => workoutPlan.phases[index],
    );
    navigation.navigate('PlanWorkoutBegin', {
      selectedPhases: selectedWorkout,
      activity: activity.title,
    });
  };

  if (!workoutPlan) return null;

  return (
    <CustomGradient>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Text style={styles.title}>Create Your Perfect Workout</Text>

        <ScrollView>
          <View style={styles.phasesContainer}>
            {workoutPlan.phases.map((phase, index) => (
              <Pressable
                key={index}
                onPress={() => togglePhase(index)}
                style={styles.phaseRow}>
                <View
                  style={[
                    styles.checkbox,
                    selectedPhases.includes(index)
                      ? styles.checkboxSelected
                      : styles.checkboxUnselected,
                  ]}>
                  {selectedPhases.includes(index) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <View style={styles.phaseTextContainer}>
                  <Text style={styles.phaseText}>
                    {phase.title}
                    {phase.duration ? ` (${phase.duration})` : ''}
                    {phase.description ? `: ${phase.description}` : ''}
                    {phase.exercises ? `: ${phase.exercises.join(', ')}` : ''}
                    {phase.sets ? ` (${phase.sets} sets)` : ''}
                    {phase.distance ? ` (${phase.distance})` : ''}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <Pressable
          style={[
            styles.startButton,
            selectedPhases.length === 0 && styles.startButtonDisabled,
          ]}
          onPress={handleStartFlow}>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>Start the Flow</Text>
          </View>
        </Pressable>
      </View>
    </CustomGradient>
  );
};

export default PlanWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '15%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  phasesContainer: {
    gap: 20,
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 5, // Added for better touch area
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
  },
  checkboxUnselected: {
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  phaseTextContainer: {
    flex: 1,
  },
  phaseText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  startButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    height: 60,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 30,
  },
  startButtonDisabled: {
    opacity: 0.5,
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
