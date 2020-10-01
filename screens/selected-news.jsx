import React, { Fragment } from "react";
import { Share } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { MAIN_BUTTON_TEXT_COLOR } from './../style-variables'; 

export const SelectedNews = ({ route: { params: { link } } }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({ message: link });
      if (result.action === Share.dismissedAction) {
        alert('Не удалось поделиться, потворите попытку позже');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Fragment>
      <ShareButton onPress={onShare}>
        <Entypo name="share" size={32} color={MAIN_BUTTON_TEXT_COLOR} />
      </ShareButton>
      <WebView source={{ uri: link }}/>
    </Fragment>
  ) 
}

const ShareButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 99;
  top: -44px;
  right: 10px;
`;