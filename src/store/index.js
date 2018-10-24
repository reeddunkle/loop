import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import thunk from 'redux-thunk';
import reducers from './reducer';

const rootReducer = storage.reducer(reducers);
const storageEngine = createEngine('loop');

const storageMiddleware = storage.createMiddleware(storageEngine);
const storageLoader = storage.createLoader(storageEngine);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, storageMiddleware))
);

storageLoader(store);

export default store;
export * from './actions';
