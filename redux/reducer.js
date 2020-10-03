import { 
  GET_ALL_CHANNELS, 
  TOGGLE_ACTIVE_SELECTION_THEME, 
  SET_SELECTED_CHANNELS_DATA,
  CLEAR_SELECTED_CHANNELS_DATA } from './actions-types';

import { setSelectedChannelsData, clearSelectedChannelsData } from './actions';
import Api from '../api/api';
import { AsyncStorage } from 'react-native';

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

const getDateAndImgUrl = array => {
  let date = '';
  let imgUrl = '';
  array.forEach(item => {
    if(!isNaN(Date.parse(item.value))) date = item.value;
    if(item.name === 'media:content') imgUrl = item.attributes.url
  })
  date = date.substring(0, date.length-6);
  return [date, imgUrl];
}

const getCachedItem = async channelName => {
  try {
    return await AsyncStorage.getItem(channelName);// returning null when nothing finded
  } catch (error) {
    alert('Ошибка получения данных из кэша')
  } 
}

const replaceCachedChannelsData = async newData => {
  try {
    const res = await AsyncStorage.removeItem(newData.channelName);
    if(res === null){
      await AsyncStorage.setItem(newData.channelName, JSON.stringify(newData));
    }  
  }
  catch(exception) {
      alert('Ошибка удаления старого кэша')
  }
}

const setCachedNewsArr = async obj => {
  try {
    const cachedChannelsData = await getCachedItem(obj.channelName);

    if(cachedChannelsData === null){
      console.log('if(cachedChannelsData === null)');
      await AsyncStorage.setItem(obj.channelName, JSON.stringify(obj));
    } else {
      replaceCachedChannelsData(obj);
    }  
  } catch (error) {
    alert('Ошибка кэширования данных');
  }
}

export const getSelectedChannelsData = () => (dispatch, getState) => {
  dispatch(clearSelectedChannelsData());

  let { selectedChannelsId, rssChannels } = getState();
  
  selectedChannelsId.map(async id => {
    try {      
      const newsArr = await api.getRssNews(rssChannels[id].link);

        let data = await newsArr.map(item => {
          return {
            title: item.children[0].value,
            link: item.children[1].value,
            date: getDateAndImgUrl(item.children)[0],
            imageUrl: getDateAndImgUrl(item.children)[1]
          }
        })

        let obj = {
          channelName: rssChannels[id].name,
          data
        }

        setCachedNewsArr(obj);
        dispatch(setSelectedChannelsData(obj));

    } catch (error) {
      const cachedData = await getCachedItem(rssChannels[id].name);

      if(cachedData === null) {
        alert(`Статей из категории "${rssChannels[id].name}" нет в кэше. Для просмотра необходим интернет`)
      } else {
        if(error.message === 'Network Error'){
          alert('Отсутствует подключение к интернету, данные будут загружены из кэша');
        }
        dispatch(setSelectedChannelsData(JSON.parse(cachedData)));
      }

      

    }
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