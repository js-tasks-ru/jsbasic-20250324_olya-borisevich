function truncate(str, maxlength) {
  if (str.length > maxlength) {
    let shortStr = str.slice(0, maxlength - 1) + '…';

    return shortStr;
  } else {
    return str;
  }
}