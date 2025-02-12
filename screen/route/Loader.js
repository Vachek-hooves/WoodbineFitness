import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomGradient from '../../components/Layout/CustomGradient';
import MainLayout from '../../components/Layout/MainLayout';

const Loader = () => {
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(progress, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => {
      // Navigate to Welcome screen after animation
      navigation.replace('Welcome');
    });
  }, []);

  return (
    <CustomGradient>
      <MainLayout>
        <View style={styles.container}>
          <Animated.Image
            source={require('../../assets/image/logo/logo.png')} // Make sure to add your runner image
            style={[
              styles.runnerImage,
              {
                transform: [{scale}],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.progressBar,
              {
                transform: [
                  {
                    scaleX: progress,
                  },
                ],
              },
            ]}
          />
        </View>
      </MainLayout>
    </CustomGradient>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  runnerImage: {
    width: 150,
    height: 150,
    tintColor: '#FF0000',
  },
  progressBar: {
    height: 4,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#FF0000',
    position: 'absolute',
    bottom: 100,
    borderRadius: 2,
    transform: [{scaleX: 0}],
    marginHorizontal: 20,
  },
});
