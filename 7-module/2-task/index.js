import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #keydownHandler = null;
  elem = null;

  constructor() {
    this.#render();
    this.#initEventListeners();
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(contentElem) {
    let bodyContainer = this.elem.querySelector('.modal__body');
    
    bodyContainer.innerHTML = '';
    bodyContainer.append(contentElem);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this.#keydownHandler = (event) => {
      if (event.code === 'Escape') {
        console.log(123);
        this.close();
      }
    };

    document.addEventListener('keydown', this.#keydownHandler);
  }

  close() {
    if (this.elem && this.elem.parentNode) {
      this.elem.remove();
    }

    document.body.classList.remove('is-modal-open');

    if (this.#keydownHandler) {
      document.removeEventListener('keydown', this.#keydownHandler);
      this.#keydownHandler = null;
    }
  }

  #initEventListeners() {
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
    this.elem.querySelector('.modal__overlay').addEventListener('click', () => this.close());
  }

  #render() {
      this.elem = createElement(this.#template());
  }

  #template() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>    
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>    
            <h3 class="modal__title"></h3>
          </div>    
          <div class="modal__body"></div>
        </div>
      </div>
    `;
  }
}
