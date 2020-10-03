import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeSelection, SelectedNews, NewsList } from './screens';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as styleVariables from './style-variables';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator  initialRouteName='ThemeSelection'
                          screenOptions={{
                            headerStyle: {
                              backgroundColor: styleVariables.MAIN_COLOR,
                            },
                            headerTintColor: styleVariables.MAIN_TEXT_COLOR_LIGHT,
                            headerTitleStyle: {
                              fontWeight: 'bold'
                            },
                          }}>

          <Stack.Screen name='ThemeSelection' options={{ title: 'Выберите темы новостей' }}>
            {props => <ThemeSelection {...props} />}
          </Stack.Screen>

          <Stack.Screen name='NewsList' options={{ title: 'Новости' }}>
            {props => <NewsList {...props} />}
          </Stack.Screen> 

          <Stack.Screen name='SelectedNews' options={{ title: 'Новость' }}>
            {props => <SelectedNews {...props} />}
          </Stack.Screen> 

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;