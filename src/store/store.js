import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

const rootPersistConfig = {
  key: 'rootStorage',
  storage: storage,
  whitelist: ['basket', 'auth']
};


const pReducer = persistReducer(rootPersistConfig, rootReducer);
const store = createStore(pReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);


export {persistor, store};
