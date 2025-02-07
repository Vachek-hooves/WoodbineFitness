import { StyleSheet, Text, View, TouchableOpacity, Dimensions,ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Welcome = ({navigation}) => {
const handleBegin = () => {
  navigation.navigate('LogIn')
}
  return (
    <LinearGradient 
      colors={['#2C0203', '#150B0B']} 
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          WOODBINE{'\n'}FITNESS
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
        Our mobile app is for those who want to stay active and exercise outdoors 🌿🏃‍♂️. We help you stay in shape 💪 and enjoy nature 🌞 by offering personalized workouts 🏋️‍♂️, diverse sports activities 🚴‍♀️🏄‍♂️, and engaging mini-games 🎮✨.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonOuterBorder} onPress={handleBegin}>
          <View style={styles.buttonInnerBorder}>
            <Text style={styles.buttonText}>Begin</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Welcome

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: '20%',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 32,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 45,
  },
  buttonContainer: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  buttonOuterBorder: {
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 25,
    padding: 2,
    width: width * 0.8,
  },
  buttonInnerBorder: {
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 50,
    minWidth: width * 0.5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    
  },
})