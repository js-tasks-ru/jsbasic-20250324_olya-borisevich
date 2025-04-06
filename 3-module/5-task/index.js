function getMinMax(str) {
  let newArr = str.split(' ')
    .filter(Number);

  let result = {
    min: Math.min(...newArr),
    max: Math.max(...newArr),
  }

  return result;
}
