import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Activities, Game, Plan, Settings, Statistic} from '../stack';
const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#666666',
      }}>
      <Tab.Screen
        name="Statistic"
        component={Statistic}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View style={focused && styles.activeIconContainer}>
              <Image
                source={require('../../assets/tabBar/statistic.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Plan"
        component={Plan}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View style={focused && styles.activeIconContainer}>
              <Image
                source={require('../../assets/tabBar/plan.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View style={focused && styles.activeIconContainer}>
              <Image
                source={require('../../assets/tabBar/activities.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View style={focused && styles.activeIconContainer}>
              <Image
                source={require('../../assets/tabBar/game.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View style={focused && styles.activeIconContainer}>
              <Image
                source={require('../../assets/tabBar/settings.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#150B0B',
    borderTopWidth: 0,
    height: 90,
    paddingBottom: 20,
    paddingTop: 15,
  },
  icon: {
    width: 32,
    height: 32,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 20,
  },
});
