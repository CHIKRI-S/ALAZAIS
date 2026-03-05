// ============================================================
// TOPBAR - Affichage / masquage au scroll + menu hamburger
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;

  // --- Configuration des seuils de scroll ---
  const HIDE_AFTER = 80;   // px avant de commencer à cacher
  const SHOW_DELTA = 40;   // px remontés pour réafficher
  const HIDE_DELTA = 10;   // px descendus pour cacher

  let lastY = window.scrollY;
  let hidden = false;
  let lastShowY = lastY;
  let lastHideY = lastY;

  // --- Fonction pour cacher la topbar ---
  function hide() {
    if (!hidden) {
      topbar.classList.add("is-hidden");
      hidden = true;
      lastHideY = window.scrollY;
    }
  }

  // --- Fonction pour afficher la topbar ---
  function show() {
    if (hidden) {
      topbar.classList.remove("is-hidden");
      hidden = false;
      lastShowY = window.scrollY;
    }
  }

  // --- Écoute du scroll pour afficher/cacher la topbar ---
  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    // Toujours afficher en haut de page
    if (y <= 10) {
      show();
      lastY = y;
      return;
    }

    // Scroll vers le bas → cacher après le seuil
    if (y > lastY) {
      if (y > HIDE_AFTER && (y - lastHideY) > HIDE_DELTA) {
        hide();
      }
    // Scroll vers le haut → réafficher après le delta
    } else if (y < lastY) {
      if ((lastY - y) > SHOW_DELTA) {
        show();
      }
    }

    lastY = y;
  }, { passive: true });

  // --- Menu hamburger (mobile) ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('topbar-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }
});

// ============================================================
// GRAPHIQUE - Univers découverts (Chart.js)
// ============================================================

const ctx = document.getElementById('universChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1920','1930','1940','1950','1960','1980','2000','2015','2026'],
    datasets: [{
      label: 'Univers découverts',
      data: [1,47,820,4320,9876,312540,8420115,243910554,1400200000],
      borderColor: '#ECFD18',
      backgroundColor: 'rgba(236,253,24,0.2)',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true
      }
    }
  }
});
