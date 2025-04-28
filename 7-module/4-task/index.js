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
    this.#initDrag();
  }

  #sliderChangeValue = (event) => {
    let sliderParam = this.elem.getBoundingClientRect(),
        posClickSlider = event.clientX - sliderParam.left,
        leftRelative = posClickSlider / this.elem.offsetWidth,
        segments = this.steps - 1,
        approximateValue = leftRelative * segments,
        value = Math.round(approximateValue);

    // Ограничиваем значение в пределах допустимого диапазона
    value = Math.max(0, Math.min(segments, value));

    let valuePercents = value / segments * 100;

    this.value = value;

    let thumb = this.elem.querySelector('.slider__thumb'),
        progress = this.elem.querySelector('.slider__progress'),
        valueElem = this.elem.querySelector('.slider__value'),
        steps = this.elem.querySelectorAll('.slider__steps span');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueElem.textContent = this.value;

    steps.forEach(span => span.classList.remove('slider__step-active'));
    steps[this.value].classList.add('slider__step-active');

    let sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(sliderChange);
  }

  #initDrag() {
    let thumb = this.elem.querySelector('.slider__thumb'),
        progress = this.elem.querySelector('.slider__progress');

    thumb.ondragstart = () => false;

    const onPointerMove = (event) => {
      event.preventDefault();

      let sliderRect = this.elem.getBoundingClientRect(),
          left = (event.clientX - sliderRect.left) / sliderRect.width;

      left = Math.max(0, Math.min(1, left));

      let leftPercents = left * 100;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    };

    const onPointerUp = (event) => {
      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

      let sliderRect = this.elem.getBoundingClientRect(),
          left = (event.clientX - sliderRect.left) / sliderRect.width;

      left = Math.max(0, Math.min(1, left));

      let segments = this.steps - 1,
          approximateValue = left * segments,
          value = Math.round(approximateValue);

      // Ограничиваем значение в пределах допустимого диапазона
      value = Math.max(0, Math.min(segments, value));

      let valuePercents = (value / segments) * 100;

      this.value = value;

      this.#updateUI(valuePercents);

      const sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });

      this.elem.dispatchEvent(sliderChange);
    };

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  #updateUI(valuePercents) {
    let thumb = this.elem.querySelector('.slider__thumb'),
        progress = this.elem.querySelector('.slider__progress'),
        valueElem = this.elem.querySelector('.slider__value'),
        steps = this.elem.querySelectorAll('.slider__steps span');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueElem.textContent = this.value;

    steps.forEach(span => span.classList.remove('slider__step-active'));
    steps[this.value].classList.add('slider__step-active');
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