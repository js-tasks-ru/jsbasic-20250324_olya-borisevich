function showSalary(users, age) {
  let newArrSalaries = users.filter(item => item.age <= age)
    .map(salary => `${salary.name}, ${salary.balance}`);


  return newArrSalaries.join('\n');
}
