export default function move(array, fromIndex, toIndex) {
  if (fromIndex === toIndex) return array;
  const result = [];

  for (let index = 0; index < array.length; index += 1) {
    if (index === toIndex) {
      if (fromIndex > toIndex) {
        result.push(array[fromIndex]);
        result.push(array[toIndex]);
      } else {
        result.push(array[toIndex]);
        result.push(array[fromIndex]);
      }
    } else if (index !== fromIndex) {
      result.push(array[index]);
    }
  }

  return result;
}
