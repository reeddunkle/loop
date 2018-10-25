import { createAction } from 'redux-actions';

export const createItem = createAction('loop/createItem', item => item);

export const deleteItem = createAction('loop/deleteItem', id => id);
