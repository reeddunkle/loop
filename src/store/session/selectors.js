import get from 'lodash/get';
import { createSelector } from 'reselect';

export const sessionSelector = state => get(state, 'session');
export const isAuthenticated = createSelector(
  [sessionSelector],
  session => !!session
);
export const loopIdSelector = createSelector([sessionSelector], session =>
  get(session, 'loopId')
);
