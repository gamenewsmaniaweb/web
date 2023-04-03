const insElement = document.querySelector('ins.adsbygoogle');
const parentElement = insElement.parentNode;
insElement.addEventListener('DOMSubtreeModified', () => {
  if (insElement.getAttribute('data-ad-status') === 'filled') {
    parentElement.style.display = 'block';
  } else {
    parentElement.style.display = 'none';
  }
});
