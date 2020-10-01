import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components/native';
import * as styleVariables from './../style-variables';
import { getAllChanels, toggleActiveSelectionTheme } from './../redux/actions';
import { AntDesign } from '@expo/vector-icons';
import { Alert } from "react-native"; 

export const ThemeSelection = ({ navigation }) => {

  const rssChannels = useSelector(state => state.rssChannels);
  const selectedChannelsId = useSelector(state => state.selectedChannelsId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChanels())
  }, [rssChannels, selectedChannelsId]);

  const About = () => {
    Alert.alert(
      'О разработчике',
      'Разработал - Астраух Д.С., гр. 881061',
      [{ text: "Дай бог ему здоровья"}],
      { cancelable: false }
    );
  }

  return (
    <Fragment>
      <Info onPress={About}>
        <AntDesign name="infocirlceo" size={32} color={styleVariables.MAIN_TEXT_COLOR_LIGHT} />
      </Info>
      <Container>
        {
          rssChannels.map(channel => {
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

        {
          selectedChannelsId.length > 0 
            ? <ContinueBtn onPress={() => navigation.push('NewsList') }><ContinueBtnText>Продолжить</ContinueBtnText></ContinueBtn>
            : <ContinueBtnDisabled><ContinueBtnText>Выберите тему(ы)</ContinueBtnText></ContinueBtnDisabled>
        }  
      </Container>
    </Fragment>
    
  )
}

const Container = styled.ScrollView`
  padding: 5px;
`;

const Info = styled.TouchableOpacity`
  position: absolute;
  z-index: 99;
  top: -44px;
  right: 10px;
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
  background-color: ${styleVariables.DISABLED_CHECKBOX_COLOR};
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

const ContinueBtn = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  background-color: ${styleVariables.MAIN_COLOR};
  color: ${styleVariables.MAIN_TEXT_COLOR_LIGHT};
  margin: 0 auto 10px auto;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ContinueBtnDisabled = styled.View`
  width: 90%;
  height: 60px;
  background-color: ${styleVariables.DISABLED_BTN_COLOR};
  color: ${styleVariables.MAIN_TEXT_COLOR_LIGHT};
  margin: 0 auto 10px auto;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ContinueBtnText = styled.Text`
  font-size: 20px;
  color: ${styleVariables.MAIN_TEXT_COLOR_LIGHT};
`;