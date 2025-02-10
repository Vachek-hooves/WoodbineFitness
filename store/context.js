import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [highScore, setHighScore] = useState(0);

  const updateHighScore = async newScore => {
    try {
      const currentHighScore = await AsyncStorage.getItem('highScore');
      if (!currentHighScore || newScore > parseInt(currentHighScore)) {
        await AsyncStorage.setItem('highScore', newScore.toString());
        setHighScore(newScore);
      }
    } catch (error) {
      console.error('Error updating high score:', error);
    }
  };

  const loadHighScore = async () => {
    try {
      const savedScore = await AsyncStorage.getItem('highScore');
      if (savedScore) {
        setHighScore(parseInt(savedScore));
      }
    } catch (error) {
      console.error('Error loading high score:', error);
    }
  };

  const value = {highScore, updateHighScore, loadHighScore};
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
