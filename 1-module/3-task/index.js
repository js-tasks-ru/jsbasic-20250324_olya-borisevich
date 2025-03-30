function ucFirst(str) {
  if(!str) return '';
  let newStr = str[0].toUpperCase() + str.slice(1);

  return newStr;
}
