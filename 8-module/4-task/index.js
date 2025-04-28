import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);

    if (!cartItem) return;

    cartItem.count += amount;

    if (cartItem.count === 0) {
      let index = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();

    modal.setTitle('Your order');

    let body = document.createElement('div');

    this.cartItems.forEach(item => {
      const productElem = this.renderProduct(item.product, item.count);
      body.append(productElem);
    });

    let orderForm = this.renderOrderForm();

    body.append(orderForm);

    modal.setBody(body);
    modal.open();

    body.addEventListener('click', (event) => {
      let button = event.target.closest('button');
      if (!button) return;

      let productElem = event.target.closest('[data-product-id]');
      if (!productElem) return;

      let productId = productElem.dataset.productId;

      if (button.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      }

      if (button.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      }
    });

    orderForm.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    let modalBody = document.querySelector('.modal__body');
    
    if (this.isEmpty()) {
      const modal = document.querySelector('.modal');

      if (modal) modal.remove();

      document.body.classList.remove('is-modal-open');

      return;
    }

    let productId = cartItem.product.id,
        productElem = modalBody.querySelector(`[data-product-id="${productId}"]`);

    if (productElem) {
      let productCount = productElem.querySelector('.cart-counter__count'),
          productPrice = productElem.querySelector('.cart-product__price');

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    }

    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    if (infoPrice) {
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let form = event.target,
      submitButton = form.querySelector('button[type="submit"]');

    submitButton.classList.add('is-loading');

    const formData = new FormData(form);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(() => {
        const modal = Modal.getCurrent ? Modal.getCurrent() : document.querySelector('.modal');

        if (modal) {
          if (modal.setTitle) {
            modal.setTitle('Success!');
          } else {
            let titleElem = modal.querySelector('.modal__title');
            
            if (titleElem) titleElem.textContent = 'Success!';
          }

          let body = modal.elem ? modal.elem.querySelector('.modal__body') : modal.querySelector('.modal__body');

          if (body) {
            body.innerHTML = `
              <div class="modal__body-inner">
                <p>
                  Order successful! Your order is being cooked :) <br>
                  We’ll notify you about delivery time shortly.<br>
                  <img src="/assets/images/delivery.gif">
                </p>
              </div>
            `;
          }
        }

        this.cartItems = [];
        this.cartIcon.update(this);
      })
      .catch(error => {
        console.error('Error submitting order:', error);
      })
      .finally(() => {
        submitButton.classList.remove('is-loading');
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

