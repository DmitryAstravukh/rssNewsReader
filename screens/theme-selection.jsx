import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components/native';
import * as styleVariables from './../style-variables';
import { getAllChanels, toggleActiveSelectionTheme } from './../redux/actions';

export const ThemeSelection = () => {

  const rssChannels = useSelector(state => state.rssChannels);
  const maxRssChannels = useSelector(state => state.maxRssChannels);
  const selectedChannelsId = useSelector(state => state.selectedChannelsId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChanels())
  }, [rssChannels, selectedChannelsId]);

  return (
    <Container>
      {
        rssChannels.map(channel => {
          console.log(selectedChannelsId);
          if(selectedChannelsId.includes(channel.id)){
            return (
              <ThemeItem key={channel.id} onPress={() => dispatch(toggleActiveSelectionTheme(channel.id))}>
                <ThemeItemText numberOfLines={1}>{channel.name}</ThemeItemText>
                <ThemeItemCheckBoxActive><ThemeItemCheckBoxMini></ThemeItemCheckBoxMini></ThemeItemCheckBoxActive>
              </ThemeItem>
            )
          }
          return (
            <ThemeItem key={channel.id} onPress={() => dispatch(toggleActiveSelectionTheme(channel.id))}>
              <ThemeItemText numberOfLines={1}>{channel.name}</ThemeItemText>
              <ThemeItemCheckBox><ThemeItemCheckBoxMini></ThemeItemCheckBoxMini></ThemeItemCheckBox>
            </ThemeItem>
          )
        })
      }
      
    </Container>
  )
}

const Container = styled.View`
  padding: 5px;
`;

const ThemeItem = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${styleVariables.THEME_ITEM_COLOR};
  flex-direction: row;
  height: 55px;
  padding: 2px 5px 5px 5px;
  align-items: center;
  margin-bottom: 5px;
`;

const ThemeItemText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${styleVariables.MAIN_TEXT_COLOR_DARK};
  flex: 0 0 90%;
`;

const ThemeItemCheckBoxActive = styled.View`
  border-radius: 50px;
  background-color: #47a690;
  flex: 0 0 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const ThemeItemCheckBox = styled.View`
  border-radius: 50px;
  background-color: gray;
  flex: 0 0 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const ThemeItemCheckBoxMini = styled.View`
  border-radius: 50px;
  background-color: white;
  width: 12px;
  height: 12px;
`;