import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');    
    this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;

    document.body.append(this.elem);
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetWidth) return;

    let screenWidth = window.innerWidth;
  
    if (screenWidth <= 767) {
      this.resetPosition();
      return;
    }
  
    if (window.pageYOffset > this.initialTopCoord) {
      let leftIndent = Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px';
  
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1000,
        left: leftIndent
      });
    } else {
      this.resetPosition();
    }
  }
  
  resetPosition() {
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    });  
  }
}
