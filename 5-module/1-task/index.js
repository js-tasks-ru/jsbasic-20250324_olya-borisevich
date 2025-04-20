function hideSelf() {
  let buttonHide = document.querySelector('.hide-self-button');

  buttonHide.addEventListener('click', (event) => {
    event.target.setAttribute('hidden', '');
  });
}
