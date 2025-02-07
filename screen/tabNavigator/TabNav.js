import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Activities, Game, Plan, Settings, Statistic} from '../stack';
const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Game" component={Game} />
      <Tab.Screen name="Plan" component={Plan} />
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Statistic" component={Statistic} />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({});
