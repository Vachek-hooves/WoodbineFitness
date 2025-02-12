import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import MainLayout from '../../components/Layout/MainLayout';

const activities = [
  {
    id: 1,
    name: 'Running',
    image: require('../../assets/image/activities/running.png'),
  },
  {
    id: 2,
    name: 'Yoga',
    image: require('../../assets/image/activities/yoga.png'),
  },
  {
    id: 3,
    name: 'Hiking',
    image: require('../../assets/image/activities/hiking.png'),
  },
  {
    id: 4,
    name: 'Cycling',
    image: require('../../assets/image/activities/cycling.png'),
  },
  {
    id: 5,
    name: 'Outdoor Fitness',
    image: require('../../assets/image/activities/outdoor.png'),
  },
  {
    id: 6,
    name: 'Other Activities',
    image: require('../../assets/image/activities/other.png'),
  },
];

const Activities = ({navigation}) => {
  return (
    <CustomGradient>
      <MainLayout>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.gridContainer}>
              {activities.map(activity => (
                <TouchableOpacity
                  key={activity.id}
                  style={styles.activityCard}
                  onPress={() =>
                    navigation.navigate('ActivitiesInstraction', {
                      activityId: activity.id,
                    })
                  }>
                  <View style={styles.imageContainer}>
                    <Image
                      source={activity.image}
                      style={styles.activityImage}
                      // resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.activityName}>{activity.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{height: 100}} />
        </ScrollView>
      </MainLayout>
    </CustomGradient>
  );
};

export default Activities;

const {width} = Dimensions.get('window');
const cardSize = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  activityCard: {
    width: cardSize,
    aspectRatio: 1,
    marginBottom: 20,
    alignItems: 'center',
    marginVertical: 20,
    padding: 4,
    borderWidth: 2,
    borderColor: '#F52629',
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: '#FF0000',
    overflow: 'hidden',
  },
  activityImage: {
    width: '100%',
    height: '100%',
    // tintColor: '#FF0000',
    borderRadius: 20,
    padding: 2,
  },
  activityName: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 20,
  },
  navIconActive: {
    tintColor: '#FF0000',
  },
});
