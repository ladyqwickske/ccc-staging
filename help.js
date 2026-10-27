// ❓ Help for superiors: a round ? button next to the page title opens a short
// explanation of the page, and a "📖 Guide" link in the menu opens the full
// guide (help.html). Regular members and visitors see neither. The texts come
// from help-content.js; this file is the same on every clan site.
// Include after portal-auth.js:
//   <script src="help-content.js"></script>
//   <script src="help.js"></script>
(function () {
  if (window.HelpGuide) return;

  var GUIDE_PAGE = 'help.html';
  var TRANSLATE_COOKIE = 'googtrans';
  var TURKISH = '/en/tr';

  var css = [
    '.help-btn { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; margin-left: 10px;'
      + ' vertical-align: middle; border-radius: 50%; border: 2px solid var(--primary, #6c47d9); background: var(--bg-card, #fff);'
      + ' color: var(--primary, #6c47d9); font: 700 16px/1 Segoe UI, Arial, sans-serif; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }',
    '.help-btn:hover, .help-btn:focus-visible { background: var(--primary, #6c47d9); color: #fff; outline: none; }',
    '.help-overlay { position: fixed; inset: 0; z-index: 9000; background: rgba(15, 12, 40, 0.45); display: none; justify-content: flex-end; }',
    '.help-overlay.open { display: flex; }',
    '.help-panel { width: 420px; max-width: 100%; height: 100%; overflow-y: auto; background: #fff; color: var(--text, #1e1b4b);'
      + ' box-shadow: -4px 0 24px rgba(0,0,0,0.25); padding: 20px 20px 80px; font: 15px/1.55 Segoe UI, Arial, sans-serif; text-align: left; }',
    '.help-panel-head { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }',
    '.help-panel-head h2 { flex: 1; margin: 0; font-size: 1.3em; color: var(--primary, #6c47d9); }',
    '.help-close { border: 0; background: none; font-size: 26px; line-height: 1; cursor: pointer; color: var(--text-muted, #555); padding: 4px 8px; }',
    '.help-who { font-size: 0.85em; color: var(--text-muted, #555); margin-bottom: 12px; }',
    '.help-summary { background: var(--accent-light, #f3effc); border-left: 4px solid var(--primary, #6c47d9); padding: 10px 12px; border-radius: 6px; margin-bottom: 14px; }',
    '.help-part { margin-bottom: 12px; }',
    '.help-part h3 { font-size: 1em; margin: 0 0 2px; color: var(--primary-hover, #3730a3); }',
    '.help-part p { margin: 0; }',
    '.help-part ul, .help-steps { margin: 4px 0 0 20px; padding: 0; }',
    '.help-part li, .help-steps li { margin-bottom: 3px; }',
    '.help-owner { font-size: 0.8em; color: var(--accent-deep, #8a5b00); font-weight: 600; }',
    '.help-actions { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 0; }',
    '.help-action { display: inline-block; padding: 8px 14px; border-radius: 8px; border: 1px solid var(--primary, #6c47d9);'
      + ' background: var(--primary, #6c47d9); color: #fff; font: 600 14px Segoe UI, Arial, sans-serif; text-decoration: none; cursor: pointer; }',
    '.help-action.secondary { background: #fff; color: var(--primary, #6c47d9); }',
    '@media (max-width: 600px) { .help-panel { width: 100%; padding: 16px 14px 80px; } .help-btn { width: 28px; height: 28px; font-size: 15px; } }',
    '@media print { .help-btn, .help-overlay { display: none !important; } }'
  ].join('\n');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Plain text with **bold** → HTML.
  function rich(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  }

  function currentPage() {
    var path = window.location.pathname || '';
    var file = path.substring(path.lastIndexOf('/') + 1);
    return (file || 'dashboard.html').toLowerCase();
  }

  function pageId(file) {
    return String(file || '').replace(/\.html$/i, '');
  }

  function content() {
    return window.HELP_CONTENT || { intro: [], pages: [] };
  }

  function pageHelp(file) {
    var pages = content().pages || [];
    for (var i = 0; i < pages.length; i++) if (pages[i].file === file) return pages[i];
    return null;
  }

  function isSuperior() {
    return typeof window.getPortalRole === 'function' && window.getPortalRole() === 'admin';
  }

  // ---- Language: Google Translate reads its choice from the 'googtrans' cookie,
  // so setting it shows every page of the site in that language.
  function cookieDomains() {
    var host = window.location.hostname;
    var parts = host.split('.');
    var list = ['', host, '.' + host];
    if (parts.length > 2) list.push('.' + parts.slice(-2).join('.'));
    return list;
  }

  function readLanguage() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
    return m ? decodeURIComponent(m[1]) : '';
  }

  function setLanguage(value) {
    cookieDomains().forEach(function (d) {
      var domain = d ? '; domain=' + d : '';
      document.cookie = TRANSLATE_COOKIE + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domain;
    });
    if (value) document.cookie = TRANSLATE_COOKIE + '=' + value + '; path=/';
    window.location.reload();
  }

  function languageButton() {
    var turkish = readLanguage() === TURKISH;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'help-action secondary notranslate';
    btn.translate = false;
    btn.textContent = turkish ? '🇬🇧 English' : '🇹🇷 Türkçe';
    btn.addEventListener('click', function () { setLanguage(turkish ? '' : TURKISH); });
    return btn;
  }

  // ---- Rendering (shared by the ❓ panel and the guide page)
  function partHtml(part) {
    var html = '<div class="help-part"><h3>' + rich(part.title) + '</h3>';
    if (part.owner) html += '<div class="help-owner">👑 Only the clan leader</div>';
    if (part.text) html += '<p>' + rich(part.text) + '</p>';
    if (part.list) html += '<ul>' + part.list.map(function (li) { return '<li>' + rich(li) + '</li>'; }).join('') + '</ul>';
    return html + '</div>';
  }

  function howtoHtml(h) {
    return '<div class="help-part"><h3>' + rich(h.q) + '</h3><ol class="help-steps">'
      + h.steps.map(function (s) { return '<li>' + rich(s) + '</li>'; }).join('') + '</ol></div>';
  }

  // ---- ❓ panel
  var overlay = null;
  var lastFocus = null;

  function buildPanel(help) {
    overlay = document.createElement('div');
    overlay.className = 'help-overlay';
    overlay.innerHTML = '<div class="help-panel" role="dialog" aria-modal="true" aria-labelledby="helpPanelTitle">'
      + '<div class="help-panel-head"><h2 id="helpPanelTitle">❓ ' + rich(help.title) + '</h2>'
      + '<button type="button" class="help-close" aria-label="Close">&times;</button></div>'
      + '<div class="help-who">👁️ ' + rich('Who sees this page: ' + help.who) + '</div>'
      + '<div class="help-summary">' + rich(help.summary) + '</div>'
      + (help.parts || []).map(partHtml).join('')
      + '<div class="help-actions"><a class="help-action" href="' + GUIDE_PAGE + '#' + pageId(help.file) + '">📖 Step by step in the guide</a></div>'
      + '</div>';
    overlay.querySelector('.help-actions').appendChild(languageButton());
    overlay.querySelector('.help-close').addEventListener('click', closePanel);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePanel(); });
    document.body.appendChild(overlay);
  }

  function openPanel() {
    lastFocus = document.activeElement;
    overlay.classList.add('open');
    overlay.querySelector('.help-close').focus();
  }

  function closePanel() {
    overlay.classList.remove('open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function addHelpButton(help) {
    if (document.getElementById('helpBtn')) return;
    var title = document.querySelector('.container h1') || document.querySelector('h1');
    if (!title) return;
    buildPanel(help);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'helpBtn';
    btn.className = 'help-btn';
    btn.title = 'Help';
    btn.setAttribute('aria-label', 'Help for this page');
    btn.textContent = '?';
    btn.addEventListener('click', openPanel);
    title.appendChild(btn);
  }

  function addGuideLink() {
    var nav = document.getElementById('navLinks') || document.querySelector('.nav-links');
    if (!nav || document.getElementById('navGuide')) return;
    var link = document.createElement('a');
    link.href = GUIDE_PAGE;
    link.id = 'navGuide';
    link.textContent = '📖 Guide';
    if (currentPage() === GUIDE_PAGE) link.className = 'active';
    nav.appendChild(link);
  }

  function removeHelp() {
    ['helpBtn', 'navGuide'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.parentNode.removeChild(el);
    });
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
  }

  function apply() {
    if (!isSuperior()) { removeHelp(); return; }
    addGuideLink();
    var help = pageHelp(currentPage());
    if (help) addHelpButton(help);
  }

  // ---- Full guide (help.html)
  function renderGuide(target) {
    var c = content();
    var pages = c.pages || [];
    var intro = c.intro || [];
    var toc = intro.map(function (s) { return '<li><a href="#' + esc(s.id) + '">' + rich(s.title) + '</a></li>'; })
      .concat(pages.map(function (p) {
        return '<li><a href="#' + pageId(p.file) + '"><img src="' + esc(p.icon) + '" alt="" class="nav-icon"> ' + rich(p.title) + '</a></li>';
      })).join('');

    var html = '<nav class="guide-toc" aria-label="Contents"><h2>Contents</h2><ol>' + toc + '</ol></nav>';

    intro.forEach(function (s) {
      html += '<section class="guide-section" id="' + esc(s.id) + '"><h2>' + rich(s.title) + '</h2>';
      (s.text || []).forEach(function (t) { html += '<p>' + rich(t) + '</p>'; });
      if (s.list) html += '<ul>' + s.list.map(function (li) { return '<li>' + rich(li) + '</li>'; }).join('') + '</ul>';
      html += '</section>';
    });

    pages.forEach(function (p) {
      html += '<section class="guide-section" id="' + pageId(p.file) + '">'
        + '<h2><img src="' + esc(p.icon) + '" alt="" class="guide-icon"> ' + rich(p.title) + '</h2>'
        + '<div class="help-who">👁️ ' + rich('Who sees this page: ' + p.who) + ' · <a href="' + esc(p.file) + '">Open the page →</a></div>'
        + '<div class="help-summary">' + rich(p.summary) + '</div>'
        + '<h3 class="guide-sub">What you see on this page</h3>'
        + (p.parts || []).map(partHtml).join('');
      if (p.howto && p.howto.length) {
        html += '<h3 class="guide-sub">How do I …?</h3>' + p.howto.map(howtoHtml).join('');
      }
      html += '<p class="guide-top"><a href="#top">↑ Back to the top</a></p></section>';
    });

    target.innerHTML = html;
  }

  window.HelpGuide = {
    renderGuide: renderGuide,
    languageButton: languageButton,
    isSuperior: isSuperior
  };

  function start() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    apply();
    document.addEventListener('portal-role-change', apply);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) closePanel();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
