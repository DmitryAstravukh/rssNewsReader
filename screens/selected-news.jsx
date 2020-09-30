import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components/native';
import Api from './../api/api';
import * as styleVariables from './../style-variables';
const api = new Api();




export const SelectedNews = ({ navigation }) => {
  const [data, setData] = useState();

  const rssChannels = useSelector(state => state.rssChannels);
  const selectedChannelsId = useSelector(state => state.selectedChannelsId);

  if(selectedChannelsId.length < 1) navigation.goBack();
  console.log('---------------------------------------------------------');


  selectedChannelsId.map((id) => {
    api.getRssNews(rssChannels[id].link).then(newsArr => {
      setData(newsArr);
      return (
        <ThemeContainer>
          <ThemeName>{rssChannels[id].name}</ThemeName>
          {
            newsArr.map(item => {
              const title = item.children[0].value;
              const link = item.children[1].value;
              const date = item.children[7].value;
              const imageUrl = item.children[8].attributes.url;

              <ThemeItem>
                <ThemeItemImage src={imageUrl} />
                <ThemeItemTextContainer>
                  <ThemeItemTitle>{title}</ThemeItemTitle>
                  <ThemeItemDate>{date}</ThemeItemDate>
                </ThemeItemTextContainer>
              </ThemeItem>
            })
          }
        </ThemeContainer>
      )      

    });
  })
  console.log(data);
  return (
    <Container>
      {/* {
        selectedChannelsId.map((id) => {
          api.getRssNews(rssChannels[id].link).then(newsArr => {
            return
            (
              <ThemeContainer>
                <ThemeName>{rssChannels[id].name}</ThemeName>
                {
                  newsArr.map(item => {
                    const title = item.children[0].value;
                    const link = item.children[1].value;
                    const date = item.children[7].value;
                    const imageUrl = item.children[8].attributes.url;

                    <ThemeItem>
                      <ThemeItemImage source={{uri:imageUrl}} />
                      <ThemeItemTextContainer>
                        <ThemeItemTitle numberOfLines={2}>{title}</ThemeItemTitle>
                        <ThemeItemDate>{date}</ThemeItemDate>
                      </ThemeItemTextContainer>
                    </ThemeItem>
                  })
                }
              </ThemeContainer>
            )      

          });
        })
      } */}
      {/* <ThemeContainer>
        <ThemeName>Главные новости недели</ThemeName>
        <ThemeItem>
          <ThemeItemImage source={{uri: 'https://img.tyt.by/n/buryakina/0d/c/ploshcha_20200826_bur_001_photo_2020-08-26_21-14-31_2_.jpg'}} />
          <ThemeItemTextContainer>
            <ThemeItemTitle numberOfLines={2}>РФ: «Это - фейк, это - нелепость»</ThemeItemTitle>
            <ThemeItemDate>Wed, 30 Sep 2020 12:20:00 +0300</ThemeItemDate>
          </ThemeItemTextContainer>
        </ThemeItem>
      </ThemeContainer> */}
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

const ThemeItem = styled.View`
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
