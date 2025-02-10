import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import {activities} from '../../data/activities';

const ActivitiesInstraction = ({route}) => {
  const {activityId} = route.params;
  const [activeTab, setActiveTab] = useState('Description');

  // Find the selected activity
  const activity = activities.find(item => item.id === activityId);

  // Find the current text content based on active tab
  const currentContent = activity.text.find(item => item.type === activeTab);

  const topTabs = ['Description', 'Instructions'];
  const bottomTabs = ['Tips', 'Gear'];

  return (
    <CustomGradient>
      <View style={styles.container}>
        <Text style={styles.title}>{activity.name.toUpperCase()}</Text>

        {/* Top Tabs */}
        <View style={styles.topTabContainer}>
          {topTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab)}>
              <View style={styles.innerContainer}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}>
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={{
            // justifyContent: 'center',
            alignItems: 'center',
            flex:1
          }}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.contentLabel}>{activeTab}:</Text>
          <Text style={styles.contentText}>{currentContent.text}</Text>
        </ScrollView>

        {/* Bottom Tabs */}
        <View style={styles.bottomTabContainer}>
          {bottomTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab)}>
              <View style={styles.innerContainer}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}>
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </CustomGradient>
  );
};

export default ActivitiesInstraction;

const styles = StyleSheet.create({
  innerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 22,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  topTabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  tabButton: {
    width: 150,
    height: 60,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FF0000',
  },
  tabText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  contentLabel: {
    color: '#FF0000',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  contentText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
  },
});
