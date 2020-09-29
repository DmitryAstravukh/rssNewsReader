import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionList } from 'react-native';
import styled from 'styled-components/native';

export const SelectedNews = (props) => {
  return (
    <Container>
      <Text>SelectedNews</Text>
    </Container>
  )
}

const Container = styled.View`
  background-color: red;
`;

const Text = styled.Text`

`;