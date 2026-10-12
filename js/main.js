/* =====================
   MAIN JAVASCRIPT
   ===================== */

// ── Theme Toggle ──────────────────────────────────────────
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = 'true';

  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncIcons(next);
  });
}

function syncIcons(theme) {
  const sun  = document.getElementById('sun-icon');
  const moon = document.getElementById('moon-icon');
  if (!sun || !moon) return;
  sun.style.display  = theme === 'dark'  ? 'block' : 'none';
  moon.style.display = theme === 'light' ? 'block' : 'none';
}

// ── Mobile Menu ───────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu || toggle.dataset.bound) return;
  toggle.dataset.bound = 'true';

  const open  = document.getElementById('menu-open-icon');
  const close = document.getElementById('menu-close-icon');

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (open)  open.style.display  = 'block';
    if (close) close.style.display = 'none';
    document.body.style.overflow = '';
  }
  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    if (open)  open.style.display  = 'none';
    if (close) close.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });
}

// ── Active Nav Link ───────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '/' && path === '/') {
      a.classList.add('active');
    } else if (href !== '/' && path.startsWith(href)) {
      a.classList.add('active');
    }
  });
}

// ── External Links ────────────────────────────────────────
function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach(a => {
    try {
      if (new URL(a.href).hostname !== window.location.hostname) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'nofollow noopener noreferrer');
      }
    } catch (_) {}
  });
}

// ── Copy Code Buttons ─────────────────────────────────────
function initCopyCode() {
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.parentElement && pre.parentElement.classList.contains('code-block')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>`;

    btn.addEventListener('click', () => {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copied!</span>`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>`;
        }, 2000);
      }).catch(() => {});
    });

    wrapper.appendChild(btn);
  });
}

// ── Search (client-side) ──────────────────────────────────
function initSearch() {
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  // All posts index (update this as you add posts)
  const posts = [
    { title: 'Getting Started with Web Development', url: '/blog/getting-started-web-dev/', date: 'Oct 10, 2026', excerpt: 'An introduction to the fundamentals of modern web development.' },
    { title: 'Building My First Full-Stack App', url: '/blog/first-fullstack-app/', date: 'Oct 5, 2026', excerpt: 'A walkthrough of building a full-stack web application from scratch.' },
    { title: 'Understanding APIs: A Beginner\'s Guide', url: '/blog/understanding-apis/', date: 'Sep 28, 2026', excerpt: 'What APIs are, how they work, and how to use them in your projects.' },
    { title: 'Python Tips for Beginners', url: '/blog/python-tips/', date: 'Sep 20, 2026', excerpt: 'Practical Python tips and tricks to write cleaner, faster code.' },
    { title: 'My Journey into Open Source', url: '/blog/open-source-journey/', date: 'Sep 12, 2026', excerpt: 'How I made my first open source contribution and what I learned.' },
  ];

  function render(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = '<p class="search-empty">Start typing to search posts...</p>';
      return;
    }
    const matches = posts.filter(p =>
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    );
    if (!matches.length) {
      results.innerHTML = '<p class="search-empty">No results found.</p>';
      return;
    }
    results.innerHTML = matches.map(p => `
      <div class="search-result-item">
        <a href="${p.url}">${p.title}</a>
        <p>${p.excerpt} <span style="color:var(--color-text-muted);font-size:12px">&mdash; ${p.date}</span></p>
      </div>`
    ).join('');
  }

  render('');
  input.addEventListener('input', () => render(input.value));
}

// ── Init All ──────────────────────────────────────────────
function boot() {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  syncIcons(theme);
  initTheme();
  initMobileMenu();
  setActiveNav();
  initExternalLinks();
  initCopyCode();
  initSearch();
}

document.addEventListener('DOMContentLoaded', boot);
