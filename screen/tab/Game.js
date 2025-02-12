import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import {useStore} from '../../store/context';
import MainLayout from '../../components/Layout/MainLayout';

const Game = ({navigation}) => {
  const {highScore, loadHighScore} = useStore();
  const handleStartGame = () => {
    navigation.navigate('GameLevels'); // We'll create this screen later
  };

  useEffect(() => {
    loadHighScore();
  }, []);

  return (
    <CustomGradient>
      <MainLayout>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Icons */}
            <View style={styles.header}>
              {/* <Pressable style={styles.iconButton}>
            <Text style={styles.iconText}>🔊</Text>
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Text style={styles.iconText}>🏆</Text>
          </Pressable> */}
            </View>

            {/* Game Logo */}
            <Image
              source={require('../../assets/image/game/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Game Description */}
            <Text style={styles.description}>
              Dive into an exciting adventure across platforms, collecting
              stars! ✨ A simple yet engaging gameplay: control your character
              with swipe-up and swipe-down actions, jump, and avoid birds 🕊️.
              Each level brings new goals and increasingly challenging tasks 🎯.
              How many stars can you collect? Complete all the levels and become
              a master! 🏆
            </Text>

            {/* Start Game Button */}
            <Pressable style={styles.startButton} onPress={handleStartGame}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttonText}>Let's Go!</Text>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </MainLayout>
    </CustomGradient>
  );
};

export default Game;

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
  logo: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    marginBottom: 30,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 40,
  },
  startButton: {
    height: 60,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 30,
    marginTop: 'auto',
    marginBottom: 40,
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
