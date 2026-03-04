document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;

  let lastY = window.scrollY;

  const HIDE_AFTER = 80;
  const SHOW_DELTA = 40;
  const HIDE_DELTA = 10;

  let hidden = false;
  let lastShowY = lastY;
  let lastHideY = lastY;

  function hide() {
    if (!hidden) {
      topbar.classList.add("is-hidden");
      hidden = true;
      lastHideY = window.scrollY;
    }
  }

  function show() {
    if (hidden) {
      topbar.classList.remove("is-hidden");
      hidden = false;
      lastShowY = window.scrollY;
    }
  }

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y <= 10) {
      show();
      lastY = y;
      return;
    }

    if (y > lastY) {
      if (y > HIDE_AFTER && (y - lastHideY) > HIDE_DELTA) {
        hide();
      }
    } else if (y < lastY) {
      if ((lastY - y) > SHOW_DELTA) {
        show();
      }
    }

    lastY = y;
  }, { passive: true });

  // ← HAMBURGER ICI DANS LE DOMCONTENTLOADED
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('topbar-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }
});

