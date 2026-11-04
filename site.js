// Shared on every page: the footer year and the current page's nav link.
document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });

const here = location.pathname.replace(/index\.html$/, '');
document.querySelectorAll('.nav nav a').forEach((a) => {
  if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
});
