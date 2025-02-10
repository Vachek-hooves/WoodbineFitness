import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  PanResponder,
  Animated,
  Modal,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import {useStore} from '../../store/context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const PLAYER_SIZE = 50;
const PLATFORM_HEIGHT = 1;
const STAR_SIZE = 30;
const BIRD_SIZE = 40;
const FPS = 60;
const FRAME_TIME = 1000 / FPS;

const GamePlay = ({navigation, route}) => {
  const {updateHighScore} = useStore();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const playerPosition = useRef(
    new Animated.ValueXY({x: 50, y: SCREEN_HEIGHT - 300}),
  ).current;
  const [platforms, setPlatforms] = useState([]);
  const [stars, setStars] = useState([]);
  const [birds, setBirds] = useState([]);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const gameLoopRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());

  const lastSavedScoreRef = useRef(0);

  // Initialize game elements
  useEffect(() => {
    startGame();
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  // Check and save score every 50 points
  useEffect(() => {
    if (score >= lastSavedScoreRef.current + 50) {
      updateHighScore(score);
      lastSavedScoreRef.current = score;
    }
  }, [score]);

  const startGame = () => {
    // Reset score when starting new game
    setScore(0);
    setGameOver(false);

    // Initialize platforms with more spread out positions
    const initialPlatforms = [
      {x: 0, y: SCREEN_HEIGHT - 150, width: 100},
      {x: SCREEN_WIDTH * 0.4, y: SCREEN_HEIGHT - 250, width: 100},
      {x: SCREEN_WIDTH * 0.8, y: SCREEN_HEIGHT - 350, width: 100},
    ];
    setPlatforms(initialPlatforms);

    // Initialize stars
    const initialStars = [
      {x: 100, y: SCREEN_HEIGHT - 300},
      {x: SCREEN_WIDTH * 0.4 + 50, y: SCREEN_HEIGHT - 400},
    ];
    setStars(initialStars);

    // Initialize birds
    const initialBirds = [
      {x: SCREEN_WIDTH, y: SCREEN_HEIGHT - 300, direction: -1},
    ];
    setBirds(initialBirds);

    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    gameLoop();
  };

  const gameLoop = () => {
    const now = Date.now();
    const deltaTime = now - lastUpdateRef.current;

    if (deltaTime >= FRAME_TIME) {
      if (!gameOver) {
        updateGameState(deltaTime);
      }
      lastUpdateRef.current = now;
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const updateGameState = deltaTime => {
    // Reduced movement speed (from 2 to 1)
    const moveSpeed = (1 * deltaTime) / FRAME_TIME;

    // Update platforms with continuous spawning
    setPlatforms(prevPlatforms => {
      const newPlatforms = prevPlatforms
        .map(platform => ({
          ...platform,
          x: platform.x - moveSpeed,
        }))
        .filter(platform => platform.x > -platform.width);

      // Add new platform when the last one is sufficiently far from the right edge
      const lastPlatform = newPlatforms[newPlatforms.length - 1];
      if (lastPlatform && lastPlatform.x < SCREEN_WIDTH - 200) {
        newPlatforms.push({
          x: SCREEN_WIDTH,
          y: Math.random() * (SCREEN_HEIGHT - 400) + 150, // Random height between 150 and SCREEN_HEIGHT-250
          width: 100,
        });
      }

      return newPlatforms;
    });

    // Update stars with continuous spawning
    setStars(prevStars => {
      const newStars = prevStars
        .map(star => ({
          ...star,
          x: star.x - moveSpeed,
        }))
        .filter(star => star.x > -STAR_SIZE);

      // Add new star with 5% chance per frame
      if (Math.random() < 0.05 && newStars.length < 5) {
        newStars.push({
          x: SCREEN_WIDTH,
          y: Math.random() * (SCREEN_HEIGHT - 400) + 150,
        });
      }

      return newStars;
    });

    // Update birds with continuous spawning
    setBirds(prevBirds => {
      const newBirds = prevBirds
        .map(bird => ({
          ...bird,
          x: bird.x - moveSpeed * 1.2, // Slightly faster than platforms
        }))
        .filter(bird => bird.x > -BIRD_SIZE);

      // Add new bird with 1% chance per frame
      if (Math.random() < 0.01 && newBirds.length < 2) {
        newBirds.push({
          x: SCREEN_WIDTH,
          y: Math.random() * (SCREEN_HEIGHT - 400) + 150,
          direction: -1,
        });
      }

      return newBirds;
    });

    // Check collisions
    checkCollisions();
  };

  const checkCollisions = () => {
    const playerX = playerPosition.x._value;
    const playerY = playerPosition.y._value;

    // Check bird collisions and deduct points
    setBirds(prevBirds => {
      let shouldEndGame = false;
      const updatedBirds = prevBirds.filter(bird => {
        const birdCollision =
          playerX < bird.x + BIRD_SIZE &&
          playerX + PLAYER_SIZE > bird.x &&
          playerY < bird.y + BIRD_SIZE &&
          playerY + PLAYER_SIZE > bird.y;

        if (birdCollision) {
          setScore(prev => {
            const newScore = prev - 20;
            if (newScore <= 0) {
              shouldEndGame = true;
            }
            return newScore;
          });
          return false; // Remove the bird
        }
        return true;
      });

      if (shouldEndGame) {
        handleGameOver();
      }

      return updatedBirds;
    });

    // Check star collisions if game is not over
    if (!gameOver) {
      setStars(prevStars => {
        let scoreIncrement = 0;
        const updatedStars = prevStars.filter(star => {
          const isColliding =
            playerX < star.x + STAR_SIZE &&
            playerX + PLAYER_SIZE > star.x &&
            playerY < star.y + STAR_SIZE &&
            playerY + PLAYER_SIZE > star.y;

          if (isColliding) {
            scoreIncrement = 10;
            return false;
          }
          return true;
        });

        if (scoreIncrement > 0) {
          setScore(prev => prev + scoreIncrement);
        }

        return updatedStars;
      });
    }
  };

  // Handle swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dy < -20) {
        // Swipe up
        jump();
      } else if (gesture.dy > 20) {
        // Swipe down
        moveDown();
      }
    },
  });

  const jump = () => {
    Animated.timing(playerPosition.y, {
      toValue: playerPosition.y._value - 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const moveDown = () => {
    Animated.timing(playerPosition.y, {
      toValue: playerPosition.y._value + 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleGameOver = () => {
    setGameOver(true);
    setShowModal(true);
    // Final score update
    updateHighScore(score);
    setScore(0);
    
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  const handleTryAgain = () => {
    setShowModal(false);
    setGameOver(false);
    startGame(); // Reset the game
    setScore(0);
  };

  const handleRevisit = () => {
    setShowModal(false);
    navigation.navigate('GameLevels');
  };

  return (
    <CustomGradient>
      <View style={styles.container} {...panResponder.panHandlers}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.iconButton}
            onPress={() => setIsSoundOn(!isSoundOn)}>
            <Text style={styles.iconText}>{isSoundOn ? '🔊' : '🔇'}</Text>
          </Pressable>
          <View style={styles.scoreContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={[styles.scoreText, score < 0 && styles.negativeScore]}>
              {score}
            </Text>
          </View>
        </View>

        {/* Game Area */}
        <View style={styles.gameArea}>
          {/* Player */}
          <Animated.Image
            source={require('../../assets/image/game/player.png')}
            style={[
              styles.player,
              {
                transform: [
                  {translateX: playerPosition.x},
                  {translateY: playerPosition.y},
                ],
              },
            ]}
          />

          {/* Platforms */}
          {platforms.map((platform, index) => (
            <View
              key={index}
              style={[
                styles.platform,
                {left: platform.x, top: platform.y, width: platform.width},
              ]}
            />
          ))}

          {/* Stars */}
          {stars.map((star, index) => (
            <Image
              key={index}
              source={require('../../assets/image/game/star.png')}
              style={[styles.star, {left: star.x, top: star.y}]}
            />
          ))}

          {/* Birds */}
          {birds.map((bird, index) => (
            <Image
              key={index}
              source={require('../../assets/image/game/bird.png')}
              style={[styles.bird, {left: bird.x, top: bird.y}]}
            />
          ))}
        </View>

        {/* Swipe Indicator */}
        <View style={styles.swipeIndicator}>
          <Image
            source={require('../../assets/image/game/swipe-indicator.png')}
            style={styles.swipeIcon}
          />
        </View>

        {/* Updated Game Over Modal */}
        <Modal
          transparent={true}
          visible={showModal}
          animationType="fade"
          onRequestClose={handleRevisit}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Top Avatar */}
              <Image
                source={require('../../assets/image/game/avatar-top.png')}
                style={styles.topAvatar}
              />

              <Text style={styles.modalText}>
                Not this time... But the{'\n'}next run will be{'\n'}legendary!
              </Text>

              {/* Bottom Avatar */}
              <Image
                source={require('../../assets/image/game/avatar-bottom.png')}
                style={styles.bottomAvatar}
              />

              {/* Buttons */}
              <Pressable style={styles.tryAgainButton} onPress={handleTryAgain}>
                <View style={styles.tryAgainInner}>
                  <Text style={styles.buttonText}>Try again</Text>
                </View>
              </Pressable>

              <Pressable style={styles.revisitButton} onPress={handleRevisit}>
                <Text style={styles.buttonText}>Revisit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </CustomGradient>
  );
};

export default GamePlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  iconButton: {
    width: 60,
    height: 50,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
  gameArea: {
    flex: 1,
  },
  player: {
    width: PLAYER_SIZE,
    height: 60,
    position: 'absolute',
  },
  platform: {
    height: PLATFORM_HEIGHT,
    backgroundColor: '#FF0000',
    position: 'absolute',
    borderRadius: 10,
  },
  star: {
    width: STAR_SIZE,
    height: 50,
    position: 'absolute',
  },
  bird: {
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    position: 'absolute',
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  swipeIcon: {
    width: 50,
    height: 120,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  negativeScore: {
    color: '#FF0000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    alignItems: 'center',
    width: '85%',
  },
  topAvatar: {
    width: 60,
    height: 130,
    tintColor: '#FF0000',
    marginBottom: 20,
    position: 'absolute',
    top: -130,
    left: 0,
  },
  bottomAvatar: {
    width: 100,
    height: 130,
    tintColor: '#FF0000',
    marginVertical: 20,
  },
  modalText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 32,
  },
  tryAgainButton: {
    width: '100%',
    height: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    marginBottom: 10,
  },
  tryAgainInner: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  revisitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  iconText: {
    fontSize: 32,
  },
});
