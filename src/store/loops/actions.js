import { createAction } from 'redux-actions';

export const createItem = createAction('loop/createItem', (item, loopId) => ({
  item,
  loopId
}));
export const deleteItem = createAction('loop/deleteItem', id => id);
