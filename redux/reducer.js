import { 
  GET_ALL_CHANNELS, 
  TOGGLE_ACTIVE_SELECTION_THEME, 
  SET_SELECTED_CHANNELS_DATA,
  CLEAR_SELECTED_CHANNELS_DATA } from './actions-types';

import { setSelectedChannelsData, clearSelectedChannelsData } from './actions';
import Api from '../api/api';

const api = new Api();

const inicialState = {
  rssChannels: [
    {
      id: 0,
      name: 'Главные новости недели',
      link: 'index.rss'
    },
    {
      id: 1,
      name: 'Происшествия',
      link: 'realty.rss'
    },
    {
      id: 2,
      name: 'Общество',
      link: 'society.rss'
    },
    {
      id: 3,
      name: 'В мире',
      link: 'world.rss'
    },
    {
      id: 4,
      name: 'Финансы',
      link: 'finance.rss'
    },
    {
      id: 5,
      name: 'Недвижимость',
      link: 'realty.rss'
    },
    {
      id: 6,
      name: 'Спорт',
      link: 'sport.rss'
    },
    {
      id: 7,
      name: 'Авто',
      link: 'auto.rss'
    }
  ],
  maxRssChannels: 3,
  selectedChannelsId: [],
  selectedChannelsData: []
};

const getAllChannels = state => {
  return state;
}

export const toggleActiveSelectionTheme = (state, id) => {
  if(state.selectedChannelsId.length + 1 <= state.maxRssChannels) {
    if(state.selectedChannelsId.includes(id)){
      return {
        ...state,
        selectedChannelsId: state.selectedChannelsId.filter(ID => ID !== id)
      }
    } else {
      return {
        ...state,
        selectedChannelsId: [
          ...state.selectedChannelsId,
          id
        ]
      }
    }
  } else {
    if(state.selectedChannelsId.includes(id)){
      return {
        ...state,
        selectedChannelsId: state.selectedChannelsId.filter(ID => ID !== id)
      }
    }
  }
  return state
}


export const getSelectedChannelsData = () => (dispatch, getState) => {
  dispatch(clearSelectedChannelsData());

  let { selectedChannelsId, rssChannels } = getState();
  selectedChannelsId.map(id => {
    api.getRssNews(rssChannels[id].link).then(newsArr => {
      let data = newsArr.map(item => {
        return {
          title: item.children[0].value,
          link: item.children[1].value,
          date: item.children[7].value,
          imageUrl: item.children[8].attributes.url,
        }
      })
      let obj = {
        channelName: rssChannels[id].name,
        data
      }
      dispatch(setSelectedChannelsData(obj));
    })
  })
}

const reducer = (state = inicialState, action) => {
  switch(action.type){
    case GET_ALL_CHANNELS: 
      return getAllChannels(state);

    case TOGGLE_ACTIVE_SELECTION_THEME: 
      return toggleActiveSelectionTheme(state, action.id);

    case SET_SELECTED_CHANNELS_DATA: 
      return {
        ...state,
        selectedChannelsData: [
          ...state.selectedChannelsData,
          action.obj
        ]
      }

    case CLEAR_SELECTED_CHANNELS_DATA: 
      return {
        ...state,
        selectedChannelsData: []
      }

    default: return state;
  }
}

export default reducer;