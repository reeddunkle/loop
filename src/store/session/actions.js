import { createAction } from 'redux-actions';

export const setSession = createAction('loop/setSession', session => session);
export const setLoopId = createAction('loop/setLoopId', id => id);
