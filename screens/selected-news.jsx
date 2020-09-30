import React from "react";
import { WebView } from 'react-native-webview';

export const SelectedNews = ({ route: { params: { link } } }) => {
  return <WebView source={{ uri: link }}/>
}
