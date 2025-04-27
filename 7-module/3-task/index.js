import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  steps = 0;
  value = 0;
  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#render();
    this.elem.addEventListener('click', (event) => this.#sliderChangeValue(event));
  }

  #sliderChangeValue = (event) => {
    let sliderParam = this.elem.getBoundingClientRect(),
        posClickSlider = event.clientX - sliderParam.left,
        leftRelative = posClickSlider / this.elem.offsetWidth,
        segments = this.steps - 1,
        approximateValue = leftRelative * segments,
        value = Math.round(approximateValue),
        valuePercents = value / segments * 100;


        this.value = value;

    let thumb = this.elem.querySelector('.slider__thumb'),
        progress = this.elem.querySelector('.slider__progress'),
        valueElem = this.elem.querySelector('.slider__value');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueElem.textContent = this.value;

    let steps = this.elem.querySelectorAll('.slider__steps span');

    steps.forEach(span => span.classList.remove('slider__step-active'));
    steps[this.value].classList.add('slider__step-active');

    let sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(sliderChange);
  }

  #render() {
        this.elem = createElement(this.#template());
  }

  #template() {
    let spans = '';

    for (let i = 0; i < this.steps; i++) {
      spans += `<span ${i === this.value ? 'class="slider__step-active"' : ''}></span>`;
    }

    return `
      <div class="slider">
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: 0%;"></div>
        <div class="slider__steps">
          ${spans}
        </div>
      </div>
    `;
  }
}
