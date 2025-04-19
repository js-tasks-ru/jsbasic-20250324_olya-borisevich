import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  slides = [];

  elem = null;

  constructor(slides) {
    this.slides = slides;

    this.#render();
  }

  #initCarousel = () => {
    const carousel = this.elem.querySelector('.carousel__inner'),
          slide = carousel.querySelectorAll('.carousel__slide'),
          buttonLeft = this.elem.querySelector('.carousel__arrow_left'),
          buttonRight = this.elem.querySelector('.carousel__arrow_right');

    let currentIndex = 0;
    const totalSlides = slide.length;

    function updateSliderPosition() {
      const offset = currentIndex * slide[0].offsetWidth;
      
      carousel.style.transform = `translateX(-${offset}px)`;

      buttonLeft.style.display = currentIndex === 0 ? 'none' : '';
      buttonRight.style.display = currentIndex === totalSlides - 1 ? 'none' : '';
    }

    buttonRight.addEventListener('click', (event) => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
      }

      updateSliderPosition();
    });
    
    buttonLeft.addEventListener('click', (event) => {
      if (currentIndex > 0) {
        currentIndex--;
      }

      updateSliderPosition();
    });

    updateSliderPosition();
  }

  #onButtonAdd = (event) => {
    const button = event.target.closest('.carousel__button');

    if(!button) return;

    const slide = event.target.closest('.carousel__slide');

    if(!slide) return;

    const id = slide.dataset.id;

    const buttonCardAdd = new CustomEvent("product-add", {
      detail: id,
      bubbles: true,
    });

    this.elem.dispatchEvent(buttonCardAdd);
  }

  #render() {
    this.elem = createElement(this.#template());

    this.#initCarousel();
    this.elem.addEventListener('click', this.#onButtonAdd);
  }

  #template() {
    return `    
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${this.slides.map(slide => `
              <div class="carousel__slide" data-id="${slide.id}">
                <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                  <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                  <div class="carousel__title">${slide.name}</div>
                  <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>
            `).join('')}
        </div>
      </div>
    `;
  }
}
