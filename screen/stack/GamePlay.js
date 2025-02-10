import { StyleSheet, Text, View, Pressable, Image, Dimensions, PanResponder, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const PLAYER_SIZE = 50;
const PLATFORM_HEIGHT = 20;
const STAR_SIZE = 30;
const BIRD_SIZE = 40;
const GRAVITY = 0.5;
const JUMP_FORCE = -15;

const GamePlay = ({ navigation, route }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  
  // Use Animated.ValueXY for player position
  const playerPosition = useRef(new Animated.ValueXY({ 
    x: 50, 
    y: SCREEN_HEIGHT - 200 
  })).current;

  // Game elements state
  const [platforms, setPlatforms] = useState([]);
  const [stars, setStars] = useState([]);
  const [birds, setBirds] = useState([]);

  // Initialize game
  useEffect(() => {
    startGame();
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        updateGameState();
      }
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, []);

  const startGame = () => {
    // Initialize with multiple platforms
    const initialPlatforms = Array(5).fill(0).map((_, index) => ({
      x: index * (SCREEN_WIDTH / 2),
      y: SCREEN_HEIGHT - 150 - (index * 100),
      width: 120
    }));
    setPlatforms(initialPlatforms);

    // Initialize stars above platforms
    const initialStars = initialPlatforms.map(platform => ({
      x: platform.x + platform.width / 2,
      y: platform.y - 100
    }));
    setStars(initialStars);

    // Initialize birds
    spawnBird();
  };

  const spawnBird = () => {
    const newBird = {
      x: SCREEN_WIDTH,
      y: Math.random() * (SCREEN_HEIGHT - 200) + 100,
      speed: Math.random() * 3 + 2
    };
    setBirds(prev => [...prev, newBird]);
  };

  const updateGameState = () => {
    // Apply gravity to player
    const newVelocity = velocity + GRAVITY;
    setVelocity(newVelocity);
    
    const newY = playerPosition.y._value + newVelocity;
    playerPosition.y.setValue(Math.min(newY, SCREEN_HEIGHT - PLAYER_SIZE));

    // Move platforms left
    setPlatforms(prevPlatforms => {
      const newPlatforms = prevPlatforms.map(platform => ({
        ...platform,
        x: platform.x - 2
      }));

      // Remove platforms that are off screen and add new ones
      if (newPlatforms[0].x < -120) {
        newPlatforms.shift();
        const lastPlatform = newPlatforms[newPlatforms.length - 1];
        newPlatforms.push({
          x: lastPlatform.x + SCREEN_WIDTH / 2,
          y: Math.random() * (SCREEN_HEIGHT / 2) + SCREEN_HEIGHT / 3,
          width: 120
        });

        // Add new star above the new platform
        setStars(prevStars => [
          ...prevStars,
          {
            x: lastPlatform.x + SCREEN_WIDTH / 2,
            y: Math.random() * (SCREEN_HEIGHT / 2)
          }
        ]);
      }
      return newPlatforms;
    });

    // Move birds
    setBirds(prevBirds => {
      const newBirds = prevBirds.map(bird => ({
        ...bird,
        x: bird.x - bird.speed
      })).filter(bird => bird.x > -BIRD_SIZE);

      // Spawn new bird occasionally
      if (Math.random() < 0.005) {
        spawnBird();
      }

      return newBirds;
    });

    // Check collisions
    checkCollisions();
  };

  const jump = () => {
    setVelocity(JUMP_FORCE);
  };

  const checkCollisions = () => {
    const playerX = playerPosition.x._value;
    const playerY = playerPosition.y._value;

    // Check platform collisions
    platforms.forEach(platform => {
      if (
        playerY + PLAYER_SIZE > platform.y &&
        playerY + PLAYER_SIZE < platform.y + PLATFORM_HEIGHT + velocity &&
        playerX + PLAYER_SIZE > platform.x &&
        playerX < platform.x + platform.width &&
        velocity > 0
      ) {
        playerPosition.y.setValue(platform.y - PLAYER_SIZE);
        setVelocity(0);
        setIsJumping(false);
      }
    });

    // Check star collections
    setStars(prevStars => {
      const remainingStars = prevStars.filter(star => {
        const collected = 
          playerX < star.x + STAR_SIZE &&
          playerX + PLAYER_SIZE > star.x &&
          playerY < star.y + STAR_SIZE &&
          playerY + PLAYER_SIZE > star.y;
        
        if (collected) {
          setScore(prev => prev + 10);
        }
        return !collected;
      });
      return remainingStars;
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

    // Check if player falls off screen
    if (playerY > SCREEN_HEIGHT) {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    navigation.navigate('GameLevels');
  };

  // Setup pan responder for touch controls
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      jump();
    },
  });

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
