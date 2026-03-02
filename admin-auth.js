// ══════════════════════════════════════════════════════════════
//  SewReady — Admin Auth Gate (Phase 3: Session-Based)
//  Loaded FIRST on all admin pages. Checks session via
//  GET /api/auth/me, falls back to legacy password if no
//  admin_users exist for the shop.
// ══════════════════════════════════════════════════════════════

(function () {
  var slug = (typeof shopConfig !== 'undefined' && shopConfig.slug) ? shopConfig.slug : 'sewready';
  var SESSION_KEY = slug + '-admin-session';
  var legacyPassword = (typeof shopConfig !== 'undefined' && shopConfig.adminPassword) ? shopConfig.adminPassword : null;

  // Block the page until auth resolves
  document.documentElement.style.visibility = 'hidden';

  // ── Check session via API ────────────────────────────────
  function checkSession() {
    return fetch('/api/auth/me', { credentials: 'include' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.user) {
          window.currentUser = data.user;
          sessionStorage.setItem(SESSION_KEY, 'authenticated');
          revealPage();
          return true;
        }
        return false;
      })
      .catch(function () { return false; });
  }

  function revealPage() {
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    var overlay = document.getElementById('adminAuthOverlay');
    if (overlay) overlay.remove();
  }

  // ── Login Form Submission ────────────────────────────────
  function attemptLogin(email, password, errorEl) {
    return fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password, shop_slug: slug })
    })
    .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
    .then(function (res) {
      if (res.ok && res.data.user) {
        window.currentUser = res.data.user;
        sessionStorage.setItem(SESSION_KEY, 'authenticated');
        revealPage();
        return true;
      } else {
        errorEl.textContent = res.data.error || 'Invalid credentials';
        errorEl.style.display = 'block';
        return false;
      }
    })
    .catch(function () {
      // Offline fallback: try legacy password
      if (legacyPassword && password === legacyPassword) {
        window.currentUser = { id: 'legacy', name: (typeof shopConfig !== 'undefined' ? shopConfig.name : 'Shop') + ' Owner', role: 'owner', shop_slug: slug };
        sessionStorage.setItem(SESSION_KEY, 'authenticated');
        revealPage();
        return true;
      }
      errorEl.textContent = 'Connection error. Please try again.';
      errorEl.style.display = 'block';
      return false;
    });
  }

  // ── Build Login Overlay ──────────────────────────────────
  function showLoginForm() {
    document.body.style.visibility = 'hidden';

    var themeColor = '#a855f7';
    var shopName = 'Shop Admin';
    if (typeof shopConfig !== 'undefined') {
      if (shopConfig.themeColors && shopConfig.themeColors.primary) themeColor = shopConfig.themeColors.primary;
      if (shopConfig.name) shopName = shopConfig.name;
    }

    var overlay = document.createElement('div');
    overlay.id = 'adminAuthOverlay';
    overlay.innerHTML =
      '<div style="position:fixed;inset:0;background:#0e1528;display:flex;align-items:center;justify-content:center;z-index:99999;font-family:Inter,sans-serif">' +
        '<div style="background:#141d33;border:1px solid rgba(240,232,220,.1);border-radius:16px;padding:40px;max-width:360px;width:90%;text-align:center">' +
          '<div style="font-size:32px;margin-bottom:8px">&#9986;</div>' +
          '<h2 style="color:#f0e8dc;margin:0 0 4px;font-size:20px" id="authShopName">' + shopName + '</h2>' +
          '<p style="color:rgba(240,232,220,.5);font-size:13px;margin:0 0 24px">Sign in to your admin account</p>' +
          '<input type="email" id="adminEmailInput" placeholder="Email" ' +
            'style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:8px;border:1px solid rgba(240,232,220,.1);background:rgba(240,232,220,.06);color:#f0e8dc;font-size:14px;outline:none;margin-bottom:10px">' +
          '<input type="password" id="adminPassInput" placeholder="Password" ' +
            'style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:8px;border:1px solid rgba(240,232,220,.1);background:rgba(240,232,220,.06);color:#f0e8dc;font-size:14px;outline:none;margin-bottom:12px">' +
          '<div id="adminAuthError" style="color:#e74c3c;font-size:12px;margin-bottom:12px;display:none">Incorrect password</div>' +
          '<button id="adminPassBtn" ' +
            'style="width:100%;padding:10px;border:none;border-radius:8px;background:' + themeColor + ';color:#fff;font-size:14px;font-weight:600;cursor:pointer">Sign In</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.style.visibility = 'visible';
    document.documentElement.style.visibility = 'visible';

    var emailInput = document.getElementById('adminEmailInput');
    var passInput = document.getElementById('adminPassInput');
    var btn = document.getElementById('adminPassBtn');
    var err = document.getElementById('adminAuthError');

    function doLogin() {
      var email = emailInput.value.trim();
      var pass = passInput.value;
      if (!email && pass && legacyPassword) {
        // Legacy mode: password-only login (no email needed for old password gate)
        if (pass === legacyPassword) {
          window.currentUser = { id: 'legacy', name: shopName + ' Owner', role: 'owner', shop_slug: slug };
          sessionStorage.setItem(SESSION_KEY, 'authenticated');
          revealPage();
          return;
        }
      }
      if (!email || !pass) {
        err.textContent = 'Enter email and password';
        err.style.display = 'block';
        return;
      }
      btn.disabled = true;
      btn.textContent = 'Signing in...';
      attemptLogin(email, pass, err).then(function (ok) {
        if (!ok) {
          btn.disabled = false;
          btn.textContent = 'Sign In';
          passInput.value = '';
          passInput.focus();
        }
      });
    }

    btn.addEventListener('click', doLogin);
    passInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') doLogin(); });
    emailInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') passInput.focus(); });
    emailInput.focus();
  }

  // ── Main Flow ────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    // Quick check: if we have a valid sessionStorage flag, try API check
    var saved = sessionStorage.getItem(SESSION_KEY);

    checkSession().then(function (valid) {
      if (!valid) {
        showLoginForm();
      }
    });
  });
})();
