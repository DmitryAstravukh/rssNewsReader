import { GET_ALL_CHANNELS, TOGGLE_ACTIVE_SELECTION_THEME } from './actions-types';

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