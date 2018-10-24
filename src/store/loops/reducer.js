import { handleActions } from 'redux-actions';
import get from 'lodash/get';
import { addItem } from './actions';

const defaultState = {
  test: {
    collection: [
      { label: 'Apple', indexHistory: [], id: 'apple' },
      { label: 'Pear', indexHistory: [], id: 'pear' },
      { label: 'Banana', indexHistory: [], id: 'banana' },
      { label: 'Cumquat', indexHistory: [], id: 'cumquat' },
      { label: 'Blackberry', indexHistory: [], id: 'blackberry' }
    ]
  }
};

export default handleActions(
  {
    [addItem]: (state, action) => {
      const { id, item } = action.payload;
      const loop = get(state, 'id', {});
      return {
        ...state,
        [id]: {
          ...loop,
          collection: [...get(loop, 'collection', []), item]
        }
      };
    }
  },
  defaultState
);
