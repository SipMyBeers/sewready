// ══════════════════════════════════════════════════════════════
//  SewReady — Admin Auth Gate
//  Loaded FIRST on all admin pages. Blocks rendering until
//  the shop owner enters their password.
// ══════════════════════════════════════════════════════════════

(function () {
  // Derive storage key from shop slug
  var slug = (typeof shopConfig !== 'undefined' && shopConfig.slug) ? shopConfig.slug : 'sewready';
  var SESSION_KEY = slug + '-admin-session';
  var password = (typeof shopConfig !== 'undefined' && shopConfig.adminPassword) ? shopConfig.adminPassword : null;

  // No password configured — skip gate (root dev mode)
  if (!password) return;

  // Already authenticated this session
  var saved = sessionStorage.getItem(SESSION_KEY);
  if (saved === 'authenticated') return;

  // ── Block the page ─────────────────────────────────────────
  document.documentElement.style.visibility = 'hidden';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.visibility = 'hidden';

    // Build login overlay
    var overlay = document.createElement('div');
    overlay.id = 'adminAuthOverlay';
    overlay.innerHTML =
      '<div style="position:fixed;inset:0;background:#0e1528;display:flex;align-items:center;justify-content:center;z-index:99999;font-family:Inter,sans-serif">' +
        '<div style="background:#141d33;border:1px solid rgba(240,232,220,.1);border-radius:16px;padding:40px;max-width:360px;width:90%;text-align:center">' +
          '<div style="font-size:32px;margin-bottom:8px">&#9986;</div>' +
          '<h2 style="color:#f0e8dc;margin:0 0 4px;font-size:20px" id="authShopName">Shop Admin</h2>' +
          '<p style="color:rgba(240,232,220,.5);font-size:13px;margin:0 0 24px">Enter your admin password</p>' +
          '<input type="password" id="adminPassInput" placeholder="Password" ' +
            'style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:8px;border:1px solid rgba(240,232,220,.1);background:rgba(240,232,220,.06);color:#f0e8dc;font-size:14px;outline:none;margin-bottom:12px">' +
          '<div id="adminAuthError" style="color:#e74c3c;font-size:12px;margin-bottom:12px;display:none">Incorrect password</div>' +
          '<button id="adminPassBtn" ' +
            'style="width:100%;padding:10px;border:none;border-radius:8px;background:#a855f7;color:#fff;font-size:14px;font-weight:600;cursor:pointer">Sign In</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    // Apply shop name and theme color
    if (typeof shopConfig !== 'undefined') {
      if (shopConfig.name) document.getElementById('authShopName').textContent = shopConfig.name;
      if (shopConfig.themeColors && shopConfig.themeColors.primary) {
        document.getElementById('adminPassBtn').style.background = shopConfig.themeColors.primary;
      }
    }

    // Make overlay visible
    overlay.style.visibility = 'visible';
    document.documentElement.style.visibility = 'visible';

    var input = document.getElementById('adminPassInput');
    var btn = document.getElementById('adminPassBtn');
    var err = document.getElementById('adminAuthError');

    function attemptLogin() {
      if (input.value === password) {
        sessionStorage.setItem(SESSION_KEY, 'authenticated');
        overlay.remove();
        document.body.style.visibility = 'visible';
      } else {
        err.style.display = 'block';
        input.value = '';
        input.focus();
      }
    }

    btn.addEventListener('click', attemptLogin);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') attemptLogin();
    });
    input.focus();
  });
})();
