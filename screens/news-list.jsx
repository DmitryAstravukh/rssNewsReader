import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components/native';
import * as styleVariables from './../style-variables';
import { getSelectedChannelsData } from './../redux/reducer';
import noImg from './../assets/noImg.jpg';

const ThemeItemComponent = ({ imageUrl, title, date, link, navigation }) => {
  return (
    <ThemeItem onPress={() => navigation.push('SelectedNews', { link }) }>
      {
        imageUrl ? <ThemeItemImage source={{uri: imageUrl}} />
                 : <ThemeItemImage source={noImg} />
      }
      <ThemeItemTextContainer>
        <ThemeItemTitle numberOfLines={2}>{title}</ThemeItemTitle>
        <ThemeItemDate numberOfLines={1}>{date}</ThemeItemDate>
      </ThemeItemTextContainer>
    </ThemeItem>
  )
}

const Theme = ({ obj, navigation }) => {
  return (
    <ThemeContainer>
      <ThemeName>{obj.channelName}</ThemeName>
      {
        obj.data.map(news => {
          return <ThemeItemComponent key={news.link} {...news} navigation={navigation}/>
        })
      }   
    </ThemeContainer>
  )
}


export const NewsList = ({ navigation }) => {
  const dispatch = useDispatch();

  const selectedChannelsId = useSelector(state => state.selectedChannelsId);
  const selectedChannelsData = useSelector(state => state.selectedChannelsData);
  
  useEffect(() => {
    dispatch(getSelectedChannelsData())
  },[selectedChannelsId]);

  return (
    <Container>
      {
        selectedChannelsData.map(obj => <Theme key={obj.channelName} obj={obj} navigation={navigation}/>)
      }
    </Container>
  )
}

const Container = styled.ScrollView`
  padding: 5px;
`;

const ThemeContainer = styled.View`
  margin-bottom: 20px;
`;

const ThemeName = styled.Text`
  font-size: 22px;
  color: ${styleVariables.MAIN_TEXT_COLOR_DARK};
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ThemeItem = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${styleVariables.THEME_ITEM_COLOR};
  height: 80px;
  padding: 5px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

const ThemeItemImage = styled.Image`
  border-radius: 5px;
  height: 60px;
  width: 19%;
  margin-right: 5px;
`;

const ThemeItemTextContainer = styled.View`
  width: 81%;
`;

const ThemeItemTitle = styled.Text`
  font-size: 16px;
  height: 40px;
  color: ${styleVariables.MAIN_TEXT_COLOR_DARK};
  font-weight: bold;
`;

const ThemeItemDate = styled.Text`
  font-size: 14px;
  color: ${styleVariables.MAIN_TEXT_COLOR_DARK};
`;
