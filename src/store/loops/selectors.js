import get from 'lodash';
import { createSelector } from 'reselect';
import { loopIdSelector } from '../session';

export const loopsSliceSlector = state => get(state, ['loops']);
export const getLoopSelector = state =>
  createSelector([loopsSliceSlector, loopIdSelector], (loops, id) =>
    get(loops, id)
  );
