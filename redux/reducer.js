import { GET_ALL_CHANNELS, TOGGLE_ACTIVE_SELECTION_THEME } from './actions-types';

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

const reducer = (state = inicialState, action) => {
  switch(action.type){
    case GET_ALL_CHANNELS: 
      return getAllChannels(state);

    case TOGGLE_ACTIVE_SELECTION_THEME: 
      return toggleActiveSelectionTheme(state, action.id);

    default: return state;
  }
}

export default reducer;