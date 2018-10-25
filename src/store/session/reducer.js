import { handleActions } from 'redux-actions';
import { setLoopId, setSession } from './actions';

const defaultState = {
  email: '',
  name: '',
  loopId: 'test-id'
};

export default handleActions(
  {
    [setSession]: (state, action) => {
      const { email, name } = action.payload;
      return {
        ...state,
        email,
        name
      };
    },
    [setLoopId]: (state, action) => {
      return {
        ...state,
        loopId: action.payload
      };
    }
  },
  defaultState
);
