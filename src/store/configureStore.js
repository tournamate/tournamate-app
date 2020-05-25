import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'home'],
};
const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware, createLogger()),
);
const store = createStore(persistedReducer, enhancer);

const persistedStore = persistStore(store);

export {store, persistedStore};
