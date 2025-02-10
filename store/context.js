import {createContext, useContext, useState} from 'react';
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

  const deductFromHighScore = async (amount) => {
    try {
      const newScore = highScore - amount;
      if (newScore >= 0) {
        await AsyncStorage.setItem('highScore', newScore.toString());
        setHighScore(newScore);
        return true; // Successful deduction
      }
      return false; // Not enough score
    } catch (error) {
      console.error('Error deducting from high score:', error);
      return false;
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

  const value = {
    highScore, 
    updateHighScore, 
    loadHighScore,
    deductFromHighScore
  };
  
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
