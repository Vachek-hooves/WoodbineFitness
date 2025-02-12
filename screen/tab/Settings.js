import {StyleSheet, Text, View, Pressable, Switch, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import {useStore} from '../../store/context';
import MainLayout from '../../components/Layout/MainLayout';

const Settings = () => {
  const {resetGameProgress} = useStore();
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all game progress? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            const success = await resetGameProgress();
            if (success) {
              Alert.alert('Success', 'All game progress has been reset.', [
                {text: 'OK'},
              ]);
            } else {
              Alert.alert(
                'Error',
                'Failed to reset game progress. Please try again.',
                [{text: 'OK'}],
              );
            }
          },
        },
      ],
    );
  };

  return (
    // <CustomGradient>
      <MainLayout>
        <View style={styles.container}>
          {/* Profile Icon */}
          {/* <View style={styles.headerRight}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </Pressable>
        </View> */}

          {/* Settings Card */}
          <View style={styles.card}>
            {/* Music Control */}
            <View style={styles.settingRow}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingIcon}>🎵</Text>
                <Text style={styles.settingText}>MUSIC</Text>
              </View>
              <Switch
                value={isMusicEnabled}
                onValueChange={setIsMusicEnabled}
                trackColor={{false: '#3f3f3f', true: '#FF0000'}}
                thumbColor={'#fff'}
              />
            </View>

            {/* Vibration Control */}
            <View style={styles.settingRow}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingIcon}>📳</Text>
                <Text style={styles.settingText}>VIBRATION</Text>
              </View>
              <Switch
                value={isVibrationEnabled}
                onValueChange={setIsVibrationEnabled}
                trackColor={{false: '#3f3f3f', true: '#FF0000'}}
                thumbColor={'#fff'}
              />
            </View>
          </View>

          {/* Reset Progress Button */}
          <Pressable style={styles.resetButton} onPress={handleResetProgress}>
            <Text style={styles.resetText}>Reset progress</Text>
          </Pressable>
        </View>
      </MainLayout>
    // </CustomGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '25%',
  },
  headerRight: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  profileIcon: {
    fontSize: 24,
  },
  card: {
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  resetText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Settings;
