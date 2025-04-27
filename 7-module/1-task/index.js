import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  categories = [];

  elem = null;

  constructor(categories) {
    this.categories = categories;

    this.#render();
    this.#clickButtonsMenu();
    this.#initCategorySelection();
  }

  #clickButtonsMenu = () => {
    let ribbonInner = this.elem.querySelector('.ribbon__inner'),
        buttonLeft = this.elem.querySelector('.ribbon__arrow_left'),
        buttonRight = this.elem.querySelector('.ribbon__arrow_right');

    function updateButtons() {
      let scrollLeft = ribbonInner.scrollLeft,
          scrollWidth = ribbonInner.scrollWidth,
          clientWidth = ribbonInner.clientWidth,
          scrollRight = scrollWidth - scrollLeft - clientWidth;

      buttonLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
      buttonRight.classList.toggle('ribbon__arrow_visible', scrollRight > 1);
    }

    buttonRight.addEventListener('click', (event) => {
      ribbonInner.scrollBy(350, 0);
    });

    buttonLeft.addEventListener('click', (event) => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      updateButtons();
    });
  }

  #initCategorySelection = () => {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    ribbonInner.addEventListener('click', (event) => {
      const item = event.target.closest('.ribbon__item');
      if (!item) return;

      event.preventDefault();

      const active = this.elem.querySelector('.ribbon__item_active');
      if (active) {
        active.classList.remove('ribbon__item_active');
      }

      item.classList.add('ribbon__item_active');
      
      const ribbonSelect = new CustomEvent('ribbon-select', {
        detail: item.dataset.id,
        bubbles: true
      });

      this.elem.dispatchEvent(ribbonSelect);
    });
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  #template() {
    return `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.categories.map((item, index) => `
              <a href="#" class="ribbon__item ${index === 0 ? 'ribbon__item_active' : ''}" data-id="${item.id}">${item.name}</a>
            `).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;
  }
}
