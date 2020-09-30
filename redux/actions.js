import { 
  GET_ALL_CHANNELS, 
  TOGGLE_ACTIVE_SELECTION_THEME, 
  SET_SELECTED_CHANNELS_DATA,
  CLEAR_SELECTED_CHANNELS_DATA } from './actions-types';

export const getAllChanels = () => {
  return {
    type: GET_ALL_CHANNELS
  }
}

export const toggleActiveSelectionTheme = (id) => {
  return {
    type: TOGGLE_ACTIVE_SELECTION_THEME,
    id
  }
}

export const setSelectedChannelsData = (obj) => {
  return {
    type: SET_SELECTED_CHANNELS_DATA,
    obj
  }
}

export const clearSelectedChannelsData = () => {
  return {
    type: CLEAR_SELECTED_CHANNELS_DATA
  }
}