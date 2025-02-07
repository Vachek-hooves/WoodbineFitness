import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomGradient from '../../components/Layout/CustomGradient';
import { activities } from '../../data/activities';

const ActivitiesInstraction = ({ route }) => {
  const { activityId } = route.params;
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
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.contentLabel}>
            {activeTab}:
          </Text>
          <Text style={styles.contentText}>
            {currentContent.text}
          </Text>
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
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </CustomGradient>
  );
};

export default ActivitiesInstraction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FF0000',
  },
  tabText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentLabel: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
});