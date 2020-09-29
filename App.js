// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import HTMLParser from 'fast-html-parser';

// export default function App() {
  // const getMoviesFromApi = async () => {
  //   try {
  //     const response = await fetch('https://news.tut.by/rss.html');
  //     let text = await response.text();
  //     //console.log(text);
  //     return text;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // getMoviesFromApi().then(html => {
  //   let parsedHTML = HTMLParser.parse(html);
  //   console.log(parsedHTML.querySelectorAll('.b-lists .lists__li a')[0])
  // });


//   return (
//     <WebView source={{ uri: 'https://news.tut.by/rss.html' }} style={{ marginTop: 20 }} />
//   );
// }

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeSelection, SelectedNews, NewsList } from './screens';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as styleVariables from './style-variables';
import { WebView } from 'react-native-webview';
import HTMLParser from 'fast-html-parser';

const Stack = createStackNavigator();

export default function App() {

  // const getMoviesFromApi = async () => {
  //   try {
  //     const response = await fetch('https://news.tut.by/rss.html');
  //     let text = await response.text();
  //     //console.log(text);
  //     return text;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // getMoviesFromApi().then(html => {
  //   let parsedHTML = HTMLParser.parse(html);
  //   console.log(parsedHTML.querySelectorAll('.b-lists .lists__li a')[0])
  // });
  return (
    // <WebView source={{ uri: 'https://news.tut.by/rss.html' }} style={{ marginTop: 20 }} />
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

          <Stack.Screen name='ThemeSelection' options={{ title: 'Выбор тем новостей' }}>
            {props => <ThemeSelection {...props} />}
          </Stack.Screen>

          <Stack.Screen name='SelectedNews' options={{ title: 'Новости', headerLeft: null }}>
            {props => <SelectedNews {...props} />}
          </Stack.Screen> 

          <Stack.Screen name='NewsList' options={{ title: 'Новость' }}>
            {props => <NewsList {...props} />}
          </Stack.Screen> 

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
