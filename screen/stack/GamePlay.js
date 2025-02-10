import { StyleSheet, Text, View, Pressable, Image, Dimensions, PanResponder, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const PLAYER_SIZE = 50;
const PLATFORM_HEIGHT = 20;
const STAR_SIZE = 30;
const BIRD_SIZE = 40;

const GamePlay = ({ navigation, route }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const playerPosition = useRef(new Animated.ValueXY({ x: 50, y: SCREEN_HEIGHT - 300 })).current;
  const [platforms, setPlatforms] = useState([]);
  const [stars, setStars] = useState([]);
  const [birds, setBirds] = useState([]);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Initialize game elements
  useEffect(() => {
    startGame();
  }, []);

  // Add game loop for movement
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        updateGame();
      }
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [gameOver, platforms]);

  const startGame = () => {
    // Initialize platforms with more spread out X positions
    const initialPlatforms = [
      { x: 0, y: SCREEN_HEIGHT - 150, width: 100 },
      { x: SCREEN_WIDTH * 0.4, y: SCREEN_HEIGHT - 250, width: 100 },
      { x: SCREEN_WIDTH * 0.8, y: SCREEN_HEIGHT - 350, width: 100 },
    ];
    setPlatforms(initialPlatforms);

    // Initialize stars
    const initialStars = [
      { x: 150, y: SCREEN_HEIGHT - 300 },
      { x: 300, y: SCREEN_HEIGHT - 400 },
    ];
    setStars(initialStars);

    // Initialize birds
    const initialBirds = [
      { x: SCREEN_WIDTH, y: SCREEN_HEIGHT - 300, direction: -1 },
    ];
    setBirds(initialBirds);
  };

  // Handle swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dy < -20) { // Swipe up
        jump();
      } else if (gesture.dy > 20) { // Swipe down
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

  const updateGame = () => {
    // Move platforms to the left
    setPlatforms(prevPlatforms => {
      const newPlatforms = prevPlatforms.map(platform => ({
        ...platform,
        x: platform.x - 2 // Move 2 pixels left each frame
      }));

      // When a platform moves off screen, add a new one on the right
      if (newPlatforms[0].x < -100) {
        newPlatforms.shift(); // Remove the leftmost platform
        const lastPlatform = newPlatforms[newPlatforms.length - 1];
        newPlatforms.push({
          x: SCREEN_WIDTH, // Start from right edge
          y: Math.random() * (SCREEN_HEIGHT - 400) + 150, // Random height
          width: 100
        });
      }

      return newPlatforms;
    });

    // Move birds
    setBirds(prevBirds => 
      prevBirds.map(bird => ({
        ...bird,
        x: bird.x + (bird.direction * 3),
      }))
    );

    // Check collisions
    checkCollisions();
  };

  const checkCollisions = () => {
    // Check platform collisions
    const playerX = playerPosition.x._value;
    const playerY = playerPosition.y._value;

    // Check star collections
    stars.forEach((star, index) => {
      if (
        playerX < star.x + STAR_SIZE &&
        playerX + PLAYER_SIZE > star.x &&
        playerY < star.y + STAR_SIZE &&
        playerY + PLAYER_SIZE > star.y
      ) {
        collectStar(index);
      }
    });

    // Check bird collisions
    birds.forEach(bird => {
      if (
        playerX < bird.x + BIRD_SIZE &&
        playerX + PLAYER_SIZE > bird.x &&
        playerY < bird.y + BIRD_SIZE &&
        playerY + PLAYER_SIZE > bird.y
      ) {
        handleGameOver();
      }
    });
  };

  const collectStar = (index) => {
    setScore(prev => prev + 10);
    setStars(prev => prev.filter((_, i) => i !== index));
  };

  const handleGameOver = () => {
    setGameOver(true);
    // Navigate to game over screen or show game over modal
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
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </View>

        {/* Game Area */}
        <View style={styles.gameArea}>
          {/* Player */}
          <Animated.Image
            source={require('../../assets/image/game/player.png')}
            style={[
              styles.player,
              { transform: [{ translateX: playerPosition.x }, { translateY: playerPosition.y }] }
            ]}
          />

          {/* Platforms */}
          {platforms.map((platform, index) => (
            <View
              key={index}
              style={[
                styles.platform,
                { left: platform.x, top: platform.y, width: platform.width }
              ]}
            />
          ))}

          {/* Stars */}
          {stars.map((star, index) => (
            <Image
              key={index}
              source={require('../../assets/image/game/star.png')}
              style={[styles.star, { left: star.x, top: star.y }]}
            />
          ))}

          {/* Birds */}
          {birds.map((bird, index) => (
            <Image
              key={index}
              source={require('../../assets/image/game/bird.png')}
              style={[styles.bird, { left: bird.x, top: bird.y }]}
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
    padding: 20,
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
    height: PLAYER_SIZE,
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
    height: 50,
  },
});
