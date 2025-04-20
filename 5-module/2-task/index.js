function toggleText() {
  let buttonHidingTxt = document.querySelector('.toggle-text-button'),
      text = document.querySelector('#text');

      buttonHidingTxt.addEventListener('click', (event) => {
        text.hasAttribute('hidden') ? text.removeAttribute('hidden') : text.setAttribute('hidden', '');
      });
}
