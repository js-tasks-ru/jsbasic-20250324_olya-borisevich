function sumSalary(salaries) {
  let sumSalariesWorkers = 0;

  for (let key in salaries) {
    if (isFinite(salaries[key])) {
      sumSalariesWorkers += salaries[key];
    }
  }

  return sumSalariesWorkers;
}
