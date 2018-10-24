import { createAction } from 'redux-actions';

export const addItem = createAction('loop/addItem', (id, item) => ({
  id,
  item
}));
