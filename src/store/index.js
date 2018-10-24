import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as storage from 'redux-storage';
import filter from 'redux-storage-decorator-filter';
import createEngine from 'redux-storage-engine-localstorage';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

const history = createHistory();
const rootReducer = storage.reducer(reducers);
const storageEngine = filter(
  createEngine('palliative-care'),
  [],
  [['ui', 'error'], ['ui', 'loading']]
);

const storageMiddleware = storage.createMiddleware(storageEngine);
const storageLoader = storage.createLoader(storageEngine);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, storageMiddleware, routerMiddleware(history))
  )
);

storageLoader(store);

export default store;
export { history };
export * from './actions';
