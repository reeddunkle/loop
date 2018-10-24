import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dataReducer from './dataStore';
import { CLEAR_STORE } from './actions';

const appReducers = combineReducers({
  data: dataReducer,
  router: routerReducer
});

const reducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }

  return appReducers(state, action);
};

export default reducer;
