import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PlanWorkout = ({route}) => {
  const {activity} = route.params;
  console.log(activity);
  return (
    <View>
      <Text>{activity}</Text>
    </View>
  );
};

export default PlanWorkout;

const styles = StyleSheet.create({});
