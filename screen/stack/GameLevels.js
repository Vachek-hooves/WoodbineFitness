import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomGradient from '../../components/Layout/CustomGradient'

const GameLevels = ({ navigation }) => {
  const [currentLevel, setCurrentLevel] = useState(1) // Track the current unlocked level
  const totalLevels = 10
  const [totalStars, setTotalStars] = useState(0)

  const handleLevelPress = (level) => {
    if (level <= currentLevel) {
      navigation.navigate('GamePlay', { level })
    }
  }

  return (
    <CustomGradient>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.iconButton}>
            <Text style={styles.iconText}>🔊</Text>
          </Pressable>
          <View style={styles.scoreContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.scoreText}>{totalStars}</Text>
          </View>
        </View>

        {/* Levels Grid */}
        <View style={styles.levelsGrid}>
          {[...Array(totalLevels)].map((_, index) => {
            const level = index + 1
            const isUnlocked = level <= currentLevel
            
            return (
              <Pressable
                key={level}
                style={[
                  styles.levelButton,
                  isUnlocked ? styles.levelUnlocked : styles.levelLocked,
                ]}
                onPress={() => handleLevelPress(level)}>
                <View style={[
                  styles.buttonInner,
                  isUnlocked ? styles.innerUnlocked : styles.innerLocked,
                ]}>
                  <Text style={styles.levelText}>{level}</Text>
                </View>
              </Pressable>
            )
          })}
        </View>

        {/* Move On Button */}
        <Pressable style={styles.moveOnButton}>
          <View style={styles.moveOnInner}>
            <Text style={styles.moveOnText}>Move On!</Text>
          </View>
        </Pressable>
      </View>
    </CustomGradient>
  )
}

export default GameLevels

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '10%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    gap: 5,
  },
  starIcon: {
    fontSize: 20,
  },
  scoreText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  levelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
    paddingHorizontal: 10,
  },
  levelButton: {
    width: 60,
    height: 60,
    padding: 3,
    borderWidth: 2,
    borderRadius: 20,
  },
  levelUnlocked: {
    borderColor: '#FF0000',
  },
  levelLocked: {
    borderColor: '#333333',
  },
  buttonInner: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerUnlocked: {
    borderColor: '#FF0000',
  },
  innerLocked: {
    borderColor: '#333333',
  },
  levelText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  moveOnButton: {
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
  moveOnInner: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveOnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
})