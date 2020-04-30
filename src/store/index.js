import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import persistConfig from './persistConfig';
import Reducer from './reducer';

const persistedReducer = persistReducer(persistConfig, Reducer),
      store = createStore(persistedReducer),
      persistor = persistStore(store);

export {
    store,
    persistor
};
