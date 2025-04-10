function highlight(table) {
  let rows = table.rows;

  for (let row of rows) {
    let ageCell = row.cells[1],
      genderCell = row.cells[2],
      statueCell = row.cells[3];

    if (statueCell.getAttribute('data-available') === 'true') {
      row.classList.add('available');
    } else if (statueCell.getAttribute('data-available') === 'false') {
      row.classList.add('unavailable');
    } else {
      row.setAttribute('hidden', '');
    }

    if (genderCell.textContent === 'm') {
      row.classList.add('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add('female');
    }

    parseInt(ageCell.textContent, 10) < 18 ? row.style.textDecoration = 'line-through' : '';
  }
}
