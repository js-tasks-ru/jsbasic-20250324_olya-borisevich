import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  products = [];
  elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};

    this.#render();
    this.#renderProducts();
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.#renderProducts();
  }

  #renderProducts() {
    let container = this.elem.querySelector('.products-grid__inner');

    container.innerHTML = '';

    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        return false;
      }

      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      return true;
    });

    filteredProducts.forEach(product => {
      let card = new ProductCard(product);
      container.append(card.elem);
    });
  }

  #render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
  }
}
