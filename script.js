document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;

  let lastY = window.scrollY;

  const HIDE_AFTER = 80;     // ne pas cacher avant 80px
  const SHOW_DELTA = 40;     // il faut remonter d'au moins 40px pour réafficher
  const HIDE_DELTA = 10;     // micro-seuil pour cacher quand on descend

  let hidden = false;
  let lastShowY = lastY;     // position où la barre a été montrée
  let lastHideY = lastY;     // position où la barre a été cachée

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

    // Si on est tout en haut, on montre toujours
    if (y <= 10) {
      show();
      lastY = y;
      return;
    }

    if (y > lastY) {
      // on descend
      if (y > HIDE_AFTER && (y - lastHideY) > HIDE_DELTA) {
        hide();
      }
    } else if (y < lastY) {
      // on remonte : on ne montre QUE si on a vraiment remonté
      if ((lastY - y) > SHOW_DELTA) {
        show();
      }
    }

    lastY = y;
  }, { passive: true });
});
