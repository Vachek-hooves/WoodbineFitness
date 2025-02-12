import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../components/Layout/MainLayout';

const LogIn = ({navigation}) => {
  const [photo, setPhoto] = useState(null);
  const [nickname, setNickname] = useState('');
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  console.log(photo, nickname);

  // Load user data when component mounts
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedNickname = await AsyncStorage.getItem('userNickname');
      const savedPhoto = await AsyncStorage.getItem('userPhoto');

      if (savedNickname && savedPhoto) {
        setNickname(savedNickname);
        setPhoto(savedPhoto);
        setIsAccountCreated(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        return;
      }
      if (response.assets && response.assets[0]) {
        const photoUri = response.assets[0].uri;
        setPhoto(photoUri);
        try {
          await AsyncStorage.setItem('userPhoto', photoUri);
        } catch (error) {
          console.error('Error saving photo:', error);
        }
      }
    });
  };

  const handleNicknameChange = async text => {
    setNickname(text);
    try {
      await AsyncStorage.setItem('userNickname', text);
    } catch (error) {
      console.error('Error saving nickname:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await AsyncStorage.removeItem('userNickname');
      await AsyncStorage.removeItem('userPhoto');
      setNickname('');
      setPhoto(null);
      setIsAccountCreated(false);
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  const handleCreateAccount = async () => {
    if (!nickname || !photo) {
      console.log('Please provide both nickname and photo');
      return;
    }

    try {
      await AsyncStorage.setItem('userNickname', nickname);
      await AsyncStorage.setItem('userPhoto', photo);
      setIsAccountCreated(true);
      console.log('Account created successfully');
      navigation.navigate('TabNav', {screen: 'Activities'});
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <CustomGradient>
      <MainLayout>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.deleteAccount}
              onPress={handleDeleteAccount}>
              <Text style={styles.deleteText}>Delete account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handleImagePicker}>
              <View style={styles.imageWrapper}>
                {photo ? (
                  <Image source={{uri: photo}} style={styles.profileImage} />
                ) : (
                  <Image
                    source={require('../../assets/icons/camera.png')}
                    style={styles.cameraIcon}
                  />
                )}
              </View>
              <Text style={styles.uploadText}>Upload Your Photo</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nickname"
                placeholderTextColor="#666"
                value={nickname}
                onChangeText={handleNicknameChange}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonOuterBorder}
              onPress={handleCreateAccount}>
              <View style={styles.buttonInnerBorder}>
                <Text style={styles.buttonText}>
                  {isAccountCreated ? 'Continue' : 'Create account'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </MainLayout>
    </CustomGradient>
  );
};

export default LogIn;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  deleteAccount: {
    position: 'absolute',
    right: 20,
    top: 80,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: '#FF0000',
  },
  uploadText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  inputContainer: {
    width: width * 0.85,
    marginTop: 40,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  buttonOuterBorder: {
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 25,
    padding: 2,
    width: width * 0.85,
    position: 'absolute',
    bottom: 50,
  },
  buttonInnerBorder: {
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
