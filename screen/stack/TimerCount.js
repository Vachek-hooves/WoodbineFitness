import { StyleSheet, Text, View, Pressable,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import CustomGradient from '../../components/Layout/CustomGradient'
import { getRandomTip } from '../../data/activityAdvices'

const TimerCount = ({ route, navigation }) => {
  const { minutes, seconds, activity } = route.params
  const totalSeconds = (minutes * 60) + seconds
  const [timeLeft, setTimeLeft] = useState(totalSeconds)
  const [isActive, setIsActive] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [currentTip, setCurrentTip] = useState(null)

  useEffect(() => {
    let interval = null
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      setIsPaused(false)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, isPaused, timeLeft])

  useEffect(() => {
    // Update tip every minute or when needed
    const tip = getRandomTip(activity)
    setCurrentTip(tip)
  }, [activity])

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:00`
  }

  const calculateProgress = () => {
    return ((totalSeconds - timeLeft) / totalSeconds) * 100
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleStop = () => {
    setIsPaused(true)
    setTimeLeft(totalSeconds)
    setIsActive(true)
  }

  const handleAddTime = () => {
    setTimeLeft(timeLeft => timeLeft + 60)
  }

  const getPlayPauseIcon = () => {
    if (isPaused || !isActive) {
      return '▶'
    }
    return '❚❚'
  }

  return (
    <CustomGradient>
      <View style={styles.container}>
        {/* Activity and Total Time */}
        <View style={styles.header}>
          <Text style={styles.activityText}>{activity}</Text>
          <Text style={styles.totalTimeText}>
            {formatTime(totalSeconds)}
          </Text>
        </View>

        {/* Timer Circle */}
        <View style={styles.timerContainer}>
          <AnimatedCircularProgress
            size={280}
            width={15}
            fill={calculateProgress()}
            tintColor="#FF0000"
            backgroundColor="#333333"
            rotation={0}
            lineCap="round">
            {() => (
              <Text style={styles.timerText}>
                {formatTime(timeLeft)}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          <View style={styles.controlsRow}>
            <Pressable
              style={styles.controlButton}
              onPress={handlePauseResume}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonText}>
                  {getPlayPauseIcon()}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.controlButton}
              onPress={handleStop}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonText}>■</Text>
              </View>
            </Pressable>
          </View>

          <Pressable
            style={[styles.controlButton, styles.addTimeButton]}
            onPress={handleAddTime}>
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>+</Text>
            </View>
          </Pressable>
        </View>

        {/* Tip */}
        {currentTip && (
          <View style={styles.tipContainer}>
            <Text style={styles.tipIcon}>{currentTip.icon}</Text>
            <Text style={styles.tipText}>{currentTip.tip}</Text>
          </View>
        )}
      </View>
    </CustomGradient>
  )
}

export default TimerCount

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  activityText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalTimeText: {
    color: 'white',
    fontSize: 20,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222',
    borderRadius: 20,
    padding: 40,
    marginBottom: 40,
  },
  timerText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  controlsContainer: {
    alignItems: 'center',
    gap: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  controlButton: {
    width: 80,
    height: 40,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 20,
  },
  addTimeButton: {
    width: 120,
  },
  buttonInner: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  tipContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  tipIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  tipText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
})