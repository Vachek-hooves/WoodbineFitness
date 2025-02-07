import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Loader, LogIn, Welcome} from './screen/route';
const Stack = createNativeStackNavigator();
import {StoreProvider} from './store/context';

function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
