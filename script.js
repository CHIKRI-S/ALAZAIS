const topbar = document.getElementById("topbar");
let lastY = window.scrollY;

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (Math.abs(y - lastY) < 8) return;

  if (y > lastY && y > 80) {
    topbar.classList.add("is-hidden");
  } else {
    topbar.classList.remove("is-hidden");
  }

  lastY = y;
}, { passive: true });
