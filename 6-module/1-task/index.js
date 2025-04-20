/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];
  elem = null;

  constructor(rows) {
    this.#rows = rows;
    this.#render();
    this.#delRow();
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  #template() {
    return `
      <table>
        <thead>
            <tr>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Зарплата</th>
                <th>Город</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          ${this.#rows.map((row, index) => `
            <tr>
              <td>${row.name}</td>
              <td>${row.age}</td>
              <td>${row.salary}</td>
              <td>${row.city}</td>
              <td><button data-action="remove">X</button></td>
            </tr>
            `).join('')}
        </tbody>
      </table>
    `;
  }

  #delRow() {
      let buttons = this.elem.querySelectorAll('[data-action]');

      for (let button of buttons) {
        button.addEventListener('click', (e) => {
          let tr = e.target.closest('tr');

          tr.remove();
        });
      }
  }
}


function createElement(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstElementChild;
}