function camelize(str) {
  let arrStr = str.split('-');

  return arrStr.map((item, index) => index == 0 ? item : item[0].toUpperCase() + item.slice(1)).join('');
}
