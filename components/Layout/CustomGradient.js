import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomGradient = ({children}) => {
  return (
    <LinearGradient colors={['#2C0203', '#150B0B']} style={styles.container}>
      {children}
    </LinearGradient>
  );
};

export default CustomGradient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
