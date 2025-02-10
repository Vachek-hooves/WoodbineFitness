import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';

const StatisticGoal = ({navigation, route}) => {
  const {activity} = route.params;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [notification, setNotification] = useState(false);

  // Check if timer has valid time set
  const isTimeSet = minutes > 0 || seconds > 0;

  const handleTimeChange = (type, increment) => {
    if (type === 'minutes') {
      if (increment) {
        setMinutes(prev => (prev < 59 ? prev + 1 : 0));
      } else {
        setMinutes(prev => (prev > 0 ? prev - 1 : 59));
      }
    } else {
      if (increment) {
        setSeconds(prev => (prev < 59 ? prev + 1 : 0));
      } else {
        setSeconds(prev => (prev > 0 ? prev - 1 : 59));
      }
    }
  };

  const handleStart = () => {
    if (isTimeSet) {
      // Add your start logic here
      navigation.navigate('TimerCount', {
        minutes,
        seconds,
        activity
      });
      console.log('Starting timer:', { minutes, seconds });
    }
  };

  return (
    <CustomGradient>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}}>
          <Text style={styles.title}>Set your desired workout time</Text>

          <View style={styles.timerContainer}>
            {/* Minutes */}
            <View style={styles.timeSection}>
              <Pressable
                style={styles.arrowButton}
                onPress={() => handleTimeChange('minutes', true)}>
                <Text style={styles.arrowText}>▲</Text>
              </Pressable>
              <Text style={styles.timeText}>
                {minutes.toString().padStart(2, '0')}
              </Text>
              <Pressable
                style={styles.arrowButton}
                onPress={() => handleTimeChange('minutes', false)}>
                <Text style={styles.arrowText}>▼</Text>
              </Pressable>
            </View>

            <Text style={styles.timeSeparator}>:</Text>

            {/* Seconds */}
            <View style={styles.timeSection}>
              <Pressable
                style={styles.arrowButton}
                onPress={() => handleTimeChange('seconds', true)}>
                <Text style={styles.arrowText}>▲</Text>
              </Pressable>
              <Text style={styles.timeText}>
                {seconds.toString().padStart(2, '0')}
              </Text>
              <Pressable
                style={styles.arrowButton}
                onPress={() => handleTimeChange('seconds', false)}>
                <Text style={styles.arrowText}>▼</Text>
              </Pressable>
            </View>
          </View>

          {/* Notification Toggle */}
          <Pressable
            style={styles.notificationContainer}
            onPress={() => setNotification(!notification)}>
            <View
              style={[styles.checkbox, notification && styles.checkboxChecked]}>
              {notification && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.notificationText}>
              Add notification upon completion.
            </Text>
          </Pressable>

          {/* Start Button */}
          <Pressable 
            style={[
              styles.startButton,
              !isTimeSet && styles.startButtonDisabled
            ]}
            onPress={handleStart}
            disabled={!isTimeSet}
          >
            <View style={[
              styles.startButtonInner,
              !isTimeSet && styles.startButtonInnerDisabled
            ]}>
              <Text style={[
                styles.startText,
                !isTimeSet && styles.startTextDisabled
              ]}>
                Start
              </Text>
            </View>
          </Pressable>
        </ScrollView>
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
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: 100,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  timeSection: {
    alignItems: 'center',
    width: 100,
  },
  arrowButton: {
    width: 60,
    height: 40,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  arrowText: {
    color: '#FF0000',
    fontSize: 20,
  },
  timeText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  timeSeparator: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF0000',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
  },
  startButton: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    height: 60,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 30,
  },
  startButtonDisabled: {
    borderColor: '#666666',
  },
  startButtonInner: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonInnerDisabled: {
    borderColor: '#666666',
  },
  startText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  startTextDisabled: {
    color: '#666666',
  },
});
