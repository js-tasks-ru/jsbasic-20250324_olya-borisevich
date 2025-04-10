function getMinMax(str) {
  let newArr = str.split(' ')
    .filter(Number);

  return {
    min: Math.min(...newArr),
    max: Math.max(...newArr),
  };
}
