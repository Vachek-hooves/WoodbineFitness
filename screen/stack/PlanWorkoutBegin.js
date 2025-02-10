import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomGradient from '../../components/Layout/CustomGradient'

const PlanWorkoutBegin = ({ route, navigation }) => {
  const { selectedPhases, activity } = route.params
  // console.log(selectedPhases);
  // console.log(activity);
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    let intervalId
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [isRunning])

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const stopWorkout = () => {
    setIsRunning(false)
  }

  const handleDone = () => {
    navigation.navigate('TabNav',{screen:'Plan'}) // Or wherever you want to navigate after completion
  }

  return (
    <CustomGradient>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{activity}</Text>
        </View>
        {/* Selected Phases */}
        <View style={styles.phasesContainer}>
          {selectedPhases.map((phase, index) => (
            <Text key={index} style={styles.phaseText}>
              {phase.title}
              {phase.duration ? ` (${phase.duration})` : ''}
              {phase.description ? `: ${phase.description}` : ''}
            </Text>
          ))}
        </View>

        {/* Timer Container */}
        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(time)}</Text>
          </View>
          
          {/* Timer Controls */}
          <View style={styles.controls}>
            <Pressable 
              style={styles.controlButton}
              onPress={toggleTimer}>
              <Text style={styles.controlText}>
                {isRunning ? '⏸' : '▶️'}
              </Text>
            </Pressable>
            <Pressable 
              style={styles.controlButton}
              onPress={stopWorkout}>
              <Text style={styles.controlText}>⏹</Text>
            </Pressable>
          </View>
        </View>

        {/* Done Button */}
        <Pressable 
          style={styles.doneButton}
          onPress={handleDone}>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>All Done!</Text>
          </View>
        </Pressable>
      </View>
    </CustomGradient>
  )
}

export default PlanWorkoutBegin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '10%',
  },
  header: {
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  marginTop:30
  },
  phasesContainer: {
    // marginBottom: 30,
    marginTop: 20,
  },
  phaseText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#333333',
    borderWidth: 2,
    borderColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  controlText: {
    fontSize: 20,
  },
  doneButton: {
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
})