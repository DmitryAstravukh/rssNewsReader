import axios from 'axios';
import XMLParser from 'react-xml-parser';
import * as rssParser from 'react-native-rss-parser';

export default class Api {
  #ax = axios.create({
      baseURL: 'https://news.tut.by/rss/'
      //baseURL: 'https://news.yandex.ru/'
  })

  #xmlParser = new XMLParser();

  getRssNews = (link) => {
    return this.#ax.get(link).then(rss => {
      return this.#xmlParser.parseFromString(rss.data).getElementsByTagName('item');
      //return rss.data;
      //return rssParser.parse(rss.data);
    })
  }

}