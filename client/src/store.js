import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import combineReducer from './reducers/combineReducer';



const persistConfig = {
  key: 'root',
  storage,
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, combineReducer);

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export const persistor = persistStore(store);