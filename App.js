import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Loader, LogIn, Welcome} from './screen/route';
import {StoreProvider} from './store/context';
import Main from './screen/main/Main';
import TabNav from './screen/tabNavigator/TabNav';
import ActivitiesInstraction from './screen/stack/ActivitiesInstraction';
import StatisticGoal from './screen/stack/StatisticGoal';
import StatisticTrain from './screen/stack/StatisticTrain';
import TimerScreen from './screen/stack/TimerScreen';
import TimerCount from './screen/stack/TimerCount';
import PlanWorkout from './screen/stack/PlanWorkout';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="TabNav" component={TabNav} />
          <Stack.Screen
            name="ActivitiesInstraction"
            component={ActivitiesInstraction}
          />
          <Stack.Screen name="StatisticGoal" component={StatisticGoal} />
          <Stack.Screen name="StatisticTrain" component={StatisticTrain} />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="TimerCount" component={TimerCount} />
          <Stack.Screen name="PlanWorkout" component={PlanWorkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
