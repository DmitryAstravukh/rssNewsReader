import { GET_ALL_CHANNELS, TOGGLE_ACTIVE_SELECTION_THEME } from './actions-types';

const inicialState = {
  rssChannels: [
    {
      id: 1,
      name: 'Главные новости недели',
      link: 'https://news.tut.by/rss/index.rss'
    },
    {
      id: 2,
      name: 'Деньги и власть',
      link: 'https://news.tut.by/rss/economics.rss'
    },
    {
      id: 3,
      name: 'Общество',
      link: 'https://news.tut.by/rss/society.rss'
    },
    {
      id: 4,
      name: 'В мире',
      link: 'https://news.tut.by/rss/world.rss'
    },
    {
      id: 5,
      name: 'Финансы',
      link: 'https://news.tut.by/rss/finance.rss'
    },
    {
      id: 6,
      name: 'Недвижимость',
      link: 'https://news.tut.by/rss/realty.rss'
    },
    {
      id: 7,
      name: 'Спорт',
      link: 'https://news.tut.by/rss/sport.rss'
    },
    {
      id: 8,
      name: 'Авто',
      link: 'https://news.tut.by/rss/auto.rss'
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