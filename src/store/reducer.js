import { combineReducers } from 'redux';
import sessionReducer from './session';
import loopsReducer from './loops';
import { CLEAR_STORE } from './actions';

const appReducers = combineReducers({
  loops: loopsReducer,
  session: sessionReducer
});

const reducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }

  return appReducers(state, action);
};

export default reducer;
