import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components/native';
import Api from './../api/api';
import * as rssParser from 'react-native-rss-parser';
const api = new Api();

export const SelectedNews = ({ navigation }) => {

  const rssChannels = useSelector(state => state.rssChannels);
  const selectedChannelsId = useSelector(state => state.selectedChannelsId);

  if(selectedChannelsId.length < 1) navigation.goBack();
  console.log('---------------------------------------------------------');


  selectedChannelsId.map((id) => {
    // api.getRssNews(rssChannels[id].link).then(news => {
    //   console.log(news);
    // });
    fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss')
  .then((response) => response.text())
  .then(async (responseData) => {
    const rss = await rssParser.parse(responseData);
    console.log(rss.title);
    console.log(rss.items.length);
  });
  })
  return (
    <Container>
      sasdaas
    </Container>
  )
}

const Container = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
`;