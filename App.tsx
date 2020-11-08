import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todo from './src/reducers/todo';
import UpdateScreen from './src/screens/UpdateScreen';

const Stack = createStackNavigator();

const store = createStore(todo);

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={MainScreen} />
          <Stack.Screen name="Update" component={UpdateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
