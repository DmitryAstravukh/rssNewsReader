import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import HTMLParser from 'fast-html-parser';

export default function App() {
  const getMoviesFromApi = async () => {
    try {
      const response = await fetch('https://news.tut.by/rss.html');
      let text = await response.text();
      //console.log(text);
      return text;
    } catch (error) {
      console.error(error);
    }
  };

  console.log('--------------------------------------------------------------------------')
  getMoviesFromApi().then(html => {
    let parsedHTML = HTMLParser.parse(html);
    console.log(parsedHTML.querySelectorAll('.lists__li a'))
  });

  // let root = HTMLParser.parse(html);

  // console.log(html.then(data => data));

  return (
    <WebView source={{ uri: 'https://news.tut.by/rss.html' }} style={{ marginTop: 20 }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
