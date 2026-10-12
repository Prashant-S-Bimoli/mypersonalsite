/* =====================
   THEME MANAGEMENT
   ===================== */
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
