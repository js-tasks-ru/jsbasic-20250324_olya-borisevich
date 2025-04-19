function initCarousel() {
  const carousel = document.querySelector('.carousel__inner'),
      slide = carousel.querySelectorAll('.carousel__slide'),
      buttonLeft = document.querySelector('.carousel__arrow_left'),
      buttonRight = document.querySelector('.carousel__arrow_right');

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
