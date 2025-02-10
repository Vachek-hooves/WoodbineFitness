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

  // Add bird spawn timer
  useEffect(() => {
    const birdSpawnInterval = setInterval(() => {
      if (!gameOver) {
        spawnBird();
      }
    }, 3500); // Spawn bird every 3.5 seconds

    return () => clearInterval(birdSpawnInterval);
  }, [gameOver]);

  const startGame = () => {
    // Initialize platforms with more spread out X positions
    const initialPlatforms = [
      { x: 0, y: SCREEN_HEIGHT - 150, width: 100, hasStar: true },
      { x: SCREEN_WIDTH * 0.4, y: SCREEN_HEIGHT - 250, width: 100, hasStar: true },
      { x: SCREEN_WIDTH * 0.8, y: SCREEN_HEIGHT - 350, width: 100, hasStar: true },
    ];
    setPlatforms(initialPlatforms);

    // Initialize stars based on platforms
    const initialStars = initialPlatforms
      .filter(platform => platform.hasStar)
      .map(platform => ({
        x: platform.x + platform.width / 2 - STAR_SIZE / 2, // Center star on platform
        y: platform.y - 60, // Position star above platform
      }));
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

  const spawnBird = () => {
    const newBird = {
      x: SCREEN_WIDTH,
      y: Math.random() * (SCREEN_HEIGHT - 400) + 150, // Random height
      direction: -1
    };
    setBirds(prev => [...prev, newBird]);
  };

  const checkCollisions = () => {
    const playerX = playerPosition.x._value;
    const playerY = playerPosition.y._value;

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

    // Check star collisions (existing code)
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
        setScore(prev => prev + 10);
      }

      return updatedStars;
    });
  };

  const updateGame = () => {
    // Move platforms to the left
    setPlatforms(prevPlatforms => {
      const newPlatforms = prevPlatforms.map(platform => ({
        ...platform,
        x: platform.x - 2
      }));

      if (newPlatforms[0].x < -100) {
        newPlatforms.shift();
        const lastPlatform = newPlatforms[newPlatforms.length - 1];
        newPlatforms.push({
          x: SCREEN_WIDTH,
          y: Math.random() * (SCREEN_HEIGHT - 400) + 150,
          width: 100,
          hasStar: Math.random() > 0.5
        });
      }

      return newPlatforms;
    });

    // Update stars positions
    setStars(prevStars => {
      // Move existing stars left
      const movedStars = prevStars.map(star => ({
        ...star,
        x: star.x - 2
      }));

      // Add new stars for new platforms
      const platformsWithNewStars = platforms
        .filter(platform => platform.hasStar && 
          !prevStars.some(star => 
            Math.abs(star.x - (platform.x + platform.width/2)) < 10
          ));

      const newStars = platformsWithNewStars.map(platform => ({
        x: platform.x + platform.width/2 - STAR_SIZE/2,
        y: platform.y - 60
      }));

      // Remove off-screen stars
      return [...movedStars, ...newStars].filter(star => star.x > -STAR_SIZE);
    });

    // Update birds position and remove off-screen birds
    setBirds(prevBirds => 
      prevBirds
        .map(bird => ({
          ...bird,
          x: bird.x + (bird.direction * 3),
        }))
        .filter(bird => bird.x > -BIRD_SIZE) // Remove off-screen birds
    );

    // Check collisions after updating positions
    checkCollisions();
  };

  const handleGameOver = () => {
    setGameOver(true);
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
    height:60,
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
});
