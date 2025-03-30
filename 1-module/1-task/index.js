function factorial(n) {
  if (typeof n === "number" && n >= 0) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}