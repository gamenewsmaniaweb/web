const insElement = document.querySelector('ins.adsbygoogle');
const parentElement = insElement.parentNode;

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
      if (mutation.target.getAttribute('data-ad-status') === 'filled') {
        parentElement.style.display = 'block !important';
      } else {
        parentElement.style.display = 'none !important';
      }
    }
  }
});

observer.observe(insElement, { attributes: true });
