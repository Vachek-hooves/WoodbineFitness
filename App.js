import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Loader, LogIn, Welcome} from './screen/route';
const Stack = createNativeStackNavigator();
import {StoreProvider} from './store/context';
import Main from './screen/main/Main';

function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
