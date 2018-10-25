import { handleActions } from 'redux-actions';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { createItem, deleteItem } from './actions';

const defaultState = {
  'test-id': {
    collection: [
      { label: 'Pear', indexHistory: [], id: 'pear' },
      { label: 'Apple', indexHistory: [], id: 'apple' },
      { label: 'Banana', indexHistory: [], id: 'banana' },
      { label: 'Cumquat', indexHistory: [], id: 'cumquat' },
      { label: 'Blackberry', indexHistory: [], id: 'blackberry' }
    ]
  }
};

export default handleActions(
  {
    [createItem]: (state, action) => {
      const item = action.payload;
      const loop = get(state, item.id, {});
      const currentCollection = get(loop, 'collection', []);
      return {
        ...state,
        [item.id]: {
          ...loop,
          collection: [...currentCollection, item]
        }
      };
    },
    [deleteItem]: (state, action) => omit(state, action.payload)
  },
  defaultState
);
