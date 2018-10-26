import kebabCase from 'lodash/kebabCase';
import { move } from '../../util';

export const getNewItem = (label, id, indexHistory = []) => {
  return {
    label,
    id: id || kebabCase(label) || null,
    indexHistory
  };
};

export function updateIndexHistories(result) {
  return result.map((item, currentIndex) => {
    return {
      ...item,
      indexHistory: [...item.indexHistory, currentIndex]
    };
  });
}

export function rankUp(index, collection = []) {
  if (index === 0) return { result: collection, newIndex: index };
  const bound = 0;
  let toIndex = Math.floor((bound + index) / 2);

  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

export function rankDown(index, collection = []) {
  if (index >= collection.length - 1)
    return { result: collection, newIndex: index };
  const bound = collection.length - 1;
  let toIndex = Math.ceil((index + bound) / 2);

  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

export function orderFirst(index, collection = []) {
  if (index === 0) return { result: collection, newIndex: index };
  const toIndex = 0;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

export function orderLast(index, collection = []) {
  if (index >= collection.length - 1)
    return { result: collection, newIndex: index };
  const toIndex = collection.length - 1;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

export function orderUp(index, collection = []) {
  if (index === 0) return { result: collection, newIndex: index };
  const toIndex = index - 1;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

export function orderDown(index, collection = []) {
  if (index >= collection.length - 1)
    return { result: collection, newIndex: index };
  const toIndex = index + 1;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}
