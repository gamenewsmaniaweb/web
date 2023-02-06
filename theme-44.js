/**
 * Setup the responsive nav events and markup
 */
const responsiveNav = () => {
  initResponsiveNav();
};

const initResponsiveNav = () => {
  if (responsiveMenu || !document.querySelector('.off-canvas')) {
    responsiveMenu = true;
    return;
  }

  // Set responsive initialized
  responsiveMenu = true;

  // Test for overlay/non-obstrusive scrollbar (MacOS).
  const hasOverlayScroll = () => {
    const ele = document.createElement("div");
    ele.setAttribute("style", "width:30px;height:30px;overflow:scroll;opacity:0");
    document.body.appendChild(ele);

    const result = ele.offsetWidth === ele.clientWidth;
    document.body.removeChild(ele);

    return result;
  }

  const setupScroll = () => {
    if (!hasTouch && !hasOverlayScroll()) {
      document.body.classList.add("has-scrollbar");

      // Reflow to fix scrollbars.
      const ele = document.querySelector('.off-canvas-content');
      ele.style.display = 'block';

      requestAnimationFrame(function() {
        ele.style.display = 'flex';
      });
    }
  }

  const setupMenuHandlers = () => {
    // Setup mobile menu click handlers
    const menuLinks = document.querySelectorAll('.mobile-menu li > a');
    for (let i = 0; i < menuLinks.length; i++) {
      const link = menuLinks[i];
      if (link.parentNode.querySelectorAll('ul').length) {
        const chevron = document.createElement('span');
        chevron.classList.add('chevron');
        chevron.innerHTML = '<i class="tsi tsi-chevron-down"></i>';
        link.parentNode.appendChild(chevron);
      }
    }

    const chevrons = document.querySelectorAll('.mobile-menu li .chevron');
    for (let i = 0; i < chevrons.length; i++) {
      const chevron = chevrons[i];
      chevron.addEventListener('click', function() {
        const parentLi = this.closest('li');
        const parentUl = parentLi.querySelector('ul');
        parentUl.parentNode.classList.toggle('active');
        parentUl.parentNode.classList.toggle('item-active');
        return false;
      });
    }
  }

  const setupMobileMenu = () => {
    var container = document.querySelector('.mobile-menu-container');
  }
};
const showMenu = () => {
  if (!isMenuSetup) {
    initSetup();
  }

  document.querySelector("html").classList.toggle("off-canvas-active");
};

const menuIcons = document.querySelectorAll(
  ".mobile-head .menu-icon a, .smart-head .offcanvas-toggle"
);
for (let i = 0; i < menuIcons.length; i++) {
  menuIcons[i].addEventListener("click", function() {
    document.dispatchEvent(new CustomEvent("ts-sticky-bar-remove"));
    showMenu();
  });
}

// Off-canvas close
const closeButtons = document.querySelectorAll(".off-canvas .close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function() {
    showMenu();
    return false;
  });
}

const backdrop = document.querySelector(".off-canvas-backdrop");
backdrop.addEventListener("click", function() {
  document.querySelector(".off-canvas .close").click();
  return false;
});



