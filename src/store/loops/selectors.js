import get from 'lodash/get';
import { createSelector } from 'reselect';
import { loopIdSelector } from '../session';

export const loopsSliceSlector = state => get(state, 'loops');
export const getLoopSelector = createSelector(
  [loopsSliceSlector, loopIdSelector],
  (loops, id) => get(loops, id)
);
export const getCollectionSelector = createSelector([getLoopSelector], loop =>
  get(loop, 'collection')
);
