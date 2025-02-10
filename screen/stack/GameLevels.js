import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStore} from '../../store/context';

const GameLevels = ({navigation}) => {
  const {highScore, deductFromHighScore, loadHighScore} = useStore();
  const [unlockedLevels, setUnlockedLevels] = useState({1: true}); // Level 1 is always unlocked
  const totalLevels = 10;
  const LEVEL_COST = 100;

  useEffect(() => {
    loadProgress();
    loadHighScore();
  }, []);

  const loadProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem('unlockedLevels');
      if (progress) {
        setUnlockedLevels(JSON.parse(progress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const unlockLevel = async level => {
    if (highScore < LEVEL_COST) {
      Alert.alert(
        'Not Enough Stars',
        `You need ${LEVEL_COST} stars to unlock this level. Current stars: ${highScore}`,
        [{text: 'OK'}],
      );
      return;
    }

    Alert.alert(
      'Unlock Level',
      `Do you want to spend ${LEVEL_COST} stars to unlock Level ${level}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Unlock',
          onPress: async () => {
            const success = await deductFromHighScore(LEVEL_COST);
            if (success) {
              const newUnlockedLevels = {...unlockedLevels, [level]: true};
              await AsyncStorage.setItem(
                'unlockedLevels',
                JSON.stringify(newUnlockedLevels),
              );
              setUnlockedLevels(newUnlockedLevels);
            }
          },
        },
      ],
    );
  };

  const handleLevelPress = level => {
    if (unlockedLevels[level]) {
      navigation.navigate('GamePlay', {level});
    } else {
      unlockLevel(level);
    }
  };

  return (
    <CustomGradient>
      <View style={styles.container}>
          {/* Header with score */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>
            <View style={styles.scoreContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.scoreText}>{highScore}</Text>
            </View>
          </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>

          <View style={styles.levelsContainer}>
            {/* Levels Grid */}
            <View style={styles.levelsGrid}>
              {Array(totalLevels)
                .fill(0)
                .map((_, index) => {
                  const level = index + 1;
                  const isUnlocked = unlockedLevels[level];

                  return (
                    <Pressable
                      key={level}
                      style={[
                        styles.levelButton,
                        isUnlocked ? styles.levelUnlocked : styles.levelLocked,
                      ]}
                      onPress={() => handleLevelPress(level)}>
                        <View style={styles.levelTextContainer}>

                      <Text style={styles.levelText}>{level}</Text>
                        </View>
                      {!isUnlocked && (
                        <Text style={styles.costText}>{LEVEL_COST}⭐</Text>
                      )}
                    </Pressable>
                  );
                })}
            </View>
          </View>
        </ScrollView>
            <Pressable style={styles.moveOnButton}>
              <View style={styles.moveOnInner}>
                <Text style={styles.moveOnText}>Move On!</Text>
              </View>
            </Pressable>
      </View>
    </CustomGradient>
  );
};

const styles = StyleSheet.create({
  levelTextContainer: {
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 12,
    // padding: 10,
    width:'90%',
    height:'90%',
    justifyContent:'center',
    alignItems:'center',
  },
  levelsContainer: {
    flex: 1,
    // padding: 20,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 50,
    marginTop: 50,
  },
  backButton: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
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
    fontWeight: '600',
  },
  levelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  levelButton: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  levelUnlocked: {
    borderColor: '#FF0000',
  },
  levelLocked: {
    borderColor: '#333333',
  },
  levelText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  costText: {
    color: '#FF0000',
    fontSize: 12,
    position: 'absolute',
    bottom: -20,
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
});

export default GameLevels;
