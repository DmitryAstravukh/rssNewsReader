import axios from 'axios';
import XMLParser from 'react-xml-parser';

export default class Api {
  #ax = axios.create({
      baseURL: 'https://news.tut.by/rss/'
  })
  #xmlParser = new XMLParser();

  getRssNews = async (link) => {
    const rss = await this.#ax.get(link);
    return this.#xmlParser.parseFromString(rss.data).getElementsByTagName('item');
  }

}