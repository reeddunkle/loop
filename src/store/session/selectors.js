import get from 'lodash/get';

export const sessionSelector = state => get(state, 'session');
export const isAuthenticated = state => !!sessionSelector(state);
export const loopIdSelector = state => get(state, 'loopId');
