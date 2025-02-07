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

  const tabs = ['Description', 'Instructions', 'Tips', 'Gear'];

  return (
    <CustomGradient>
      <View style={styles.container}>
        <Text style={styles.title}>{activity.name.toUpperCase()}</Text>
        
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
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

        <ScrollView 
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.contentText}>
            {currentContent.text}
          </Text>
        </ScrollView>
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
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FF0000',
  },
  tabText: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
});