import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const store = createStore(
  reducer,
  //compose(
   // offline(offlineConfig),
    applyMiddleware(thunkMiddleware)
  //)
);
export default store;

