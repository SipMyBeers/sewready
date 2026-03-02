document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('settingsForm');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 3000);
  }

  // ── Populate form from DataStore shop config ──
  const config = DataStore.getShopConfig();
  const shopNameInput = document.getElementById('shopName');
  const shopAddressInput = document.getElementById('shopAddress');
  const shopPhoneInput = document.getElementById('shopPhone');
  const shopEmailInput = document.getElementById('shopEmail');
  if (shopNameInput) shopNameInput.value = config.name || '';
  if (shopAddressInput) shopAddressInput.value = config.address || '';
  if (shopPhoneInput) shopPhoneInput.value = config.phone || '';
  if (shopEmailInput) shopEmailInput.value = config.email || '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const changes = {};
    if (shopNameInput) changes.name = shopNameInput.value;
    if (shopAddressInput) changes.address = shopAddressInput.value;
    if (shopPhoneInput) changes.phone = shopPhoneInput.value;
    if (shopEmailInput) changes.email = shopEmailInput.value;
    DataStore.updateShopConfig(changes);
    // Update .shop-name elements on the page
    document.querySelectorAll('.shop-name').forEach(el => { el.textContent = changes.name || config.name; });
    showToast('Settings saved successfully!');
  });

  // ── Sidebar Toggle ────────────────────────────────────────
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // ══════════════════════════════════════════════════════════
  //  EMPLOYEE SCHEDULE EDITOR
  // ══════════════════════════════════════════════════════════

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // ── Master Render ──────────────────────────────────────────
  function renderScheduleSection() {
    renderShiftRequests();
    renderEmployeeCards();
    renderClosedDates();
  }

  // ── Shift Requests ─────────────────────────────────────────
  function renderShiftRequests() {
    const container = document.getElementById('schedRequests');
    if (shiftRequests.length === 0) {
      container.innerHTML = '<p class="sched-no-requests">No pending shift requests.</p>';
      return;
    }

    container.innerHTML = shiftRequests.map(req => {
      const emp = employees.find(e => e.id === req.employeeId);
      const swapEmp = req.preferredSwap ? employees.find(e => e.id === req.preferredSwap) : null;
      const empName = emp ? emp.name : 'Unknown';
      const empColor = emp ? emp.color : '#888';

      const typeLabels = { 'day-off': 'Day Off', 'change-hours': 'Change Hours', 'swap': 'Swap With Coworker' };
      const typeLabel = typeLabels[req.type] || req.type;

      const isPending = req.status === 'pending';

      return '<div class="sched-request-card" data-status="' + req.status + '" data-id="' + req.id + '">' +
        '<div class="sched-request-icon">&#128197;</div>' +
        '<div class="sched-request-body">' +
          '<div class="sched-request-title">' +
            '<span class="sched-emp-dot" style="background:' + empColor + '"></span> ' +
            empName + ' — ' + typeLabel +
            ' <span class="sched-request-status ' + req.status + '">' + req.status.charAt(0).toUpperCase() + req.status.slice(1) + '</span>' +
          '</div>' +
          '<div class="sched-request-detail">Date: ' + req.date +
            (swapEmp ? ' &middot; Preferred swap: ' + swapEmp.name : '') +
          '</div>' +
          (req.reason ? '<div class="sched-request-reason">"' + req.reason + '"</div>' : '') +
          '<div class="sched-request-time">Submitted: ' + req.submittedAt + '</div>' +
        '</div>' +
        (isPending ?
          '<div class="sched-request-actions">' +
            '<button class="sched-approve-btn" data-id="' + req.id + '">Approve</button>' +
            '<button class="sched-deny-btn" data-id="' + req.id + '">Deny</button>' +
          '</div>' : '') +
      '</div>';
    }).join('');

    // Event delegation for approve/deny
    container.querySelectorAll('.sched-approve-btn').forEach(btn => {
      btn.addEventListener('click', () => approveRequest(btn.dataset.id));
    });
    container.querySelectorAll('.sched-deny-btn').forEach(btn => {
      btn.addEventListener('click', () => denyRequest(btn.dataset.id));
    });
  }

  function approveRequest(reqId) {
    const req = shiftRequests.find(r => r.id === reqId);
    if (!req) return;
    DataStore.updateShiftRequest(reqId, { status: 'approved' });

    // Update employee schedule for that date's day-of-week
    if (req.type === 'day-off') {
      const emp = employees.find(e => e.id === req.employeeId);
      if (emp) {
        const dow = new Date(req.date + 'T00:00:00').getDay();
        emp.schedule[dow] = null;
        DataStore.updateEmployee(emp.id, { schedule: emp.schedule });
      }
    } else if (req.type === 'change-hours' && req.requestedShift) {
      const emp = employees.find(e => e.id === req.employeeId);
      if (emp) {
        const dow = new Date(req.date + 'T00:00:00').getDay();
        emp.schedule[dow] = { start: req.requestedShift.start, end: req.requestedShift.end };
        DataStore.updateEmployee(emp.id, { schedule: emp.schedule });
      }
    }

    showToast('Shift request approved!');
    renderScheduleSection();
  }

  function denyRequest(reqId) {
    DataStore.updateShiftRequest(reqId, { status: 'denied' });
    showToast('Shift request denied.');
    renderScheduleSection();
  }

  // ── Employee Cards ─────────────────────────────────────────
  function renderEmployeeCards() {
    const container = document.getElementById('schedEmployeeList');

    container.innerHTML = employees.map((emp, idx) => {
      let weekHtml = '';
      for (let d = 0; d < 7; d++) {
        const sched = emp.schedule[d];
        if (sched) {
          weekHtml += '<div class="sched-day sched-day-on">' +
            '<div class="sched-day-label">' + dayNames[d] + '</div>' +
            '<input type="time" class="sched-time-input" data-emp="' + emp.id + '" data-dow="' + d + '" data-field="start" value="' + sched.start + '">' +
            '<input type="time" class="sched-time-input" data-emp="' + emp.id + '" data-dow="' + d + '" data-field="end" value="' + sched.end + '">' +
            '<button class="sched-day-toggle" data-emp="' + emp.id + '" data-dow="' + d + '" data-action="off" title="Set day off">&#10005;</button>' +
          '</div>';
        } else {
          weekHtml += '<div class="sched-day sched-day-off">' +
            '<div class="sched-day-label">' + dayNames[d] + '</div>' +
            '<span class="sched-off-label">Off</span>' +
            '<button class="sched-day-toggle" data-emp="' + emp.id + '" data-dow="' + d + '" data-action="on" title="Set working">&#10003;</button>' +
          '</div>';
        }
      }

      const empUrl = 'employee.html?id=' + emp.id;

      return '<div class="sched-emp-card" data-emp-id="' + emp.id + '">' +
        '<div class="sched-emp-header">' +
          '<span class="sched-emp-dot" style="background:' + emp.color + '"></span>' +
          '<span class="sched-emp-name">' + emp.name + '</span>' +
          '<span class="sched-emp-role">' + emp.role + '</span>' +
          '<button class="sched-emp-remove" data-emp="' + emp.id + '" title="Remove employee">&times;</button>' +
        '</div>' +
        '<div class="sched-week-grid">' + weekHtml + '</div>' +
        '<div class="sched-emp-link">' +
          '<span class="sched-emp-link-url">' + empUrl + '</span>' +
          '<button class="sched-emp-link-copy" data-url="' + empUrl + '">Copy</button>' +
        '</div>' +
      '</div>';
    }).join('');

    // Event delegation — time inputs
    container.querySelectorAll('.sched-time-input').forEach(input => {
      input.addEventListener('change', () => {
        const emp = employees.find(e => e.id === input.dataset.emp);
        if (!emp) return;
        const dow = parseInt(input.dataset.dow);
        if (!emp.schedule[dow]) emp.schedule[dow] = { start: '08:00', end: '18:00' };
        emp.schedule[dow][input.dataset.field] = input.value;
        DataStore.updateEmployee(emp.id, { schedule: emp.schedule });
      });
    });

    // Day toggles
    container.querySelectorAll('.sched-day-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const emp = employees.find(e => e.id === btn.dataset.emp);
        if (!emp) return;
        const dow = parseInt(btn.dataset.dow);
        if (btn.dataset.action === 'off') {
          emp.schedule[dow] = null;
        } else {
          emp.schedule[dow] = { start: '08:00', end: '18:00' };
        }
        DataStore.updateEmployee(emp.id, { schedule: emp.schedule });
        renderEmployeeCards();
      });
    });

    // Remove employee
    container.querySelectorAll('.sched-emp-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        DataStore.removeEmployee(btn.dataset.emp);
        renderEmployeeCards();
        showToast('Employee removed.');
      });
    });

    // Copy link
    container.querySelectorAll('.sched-emp-link-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        navigator.clipboard.writeText(url).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
        });
      });
    });
  }

  // ── Closed Dates ───────────────────────────────────────────
  function renderClosedDates() {
    const list = document.getElementById('schedClosedList');
    list.innerHTML = closedDates.map(d =>
      '<span class="sched-closed-chip">' + d +
        '<button data-date="' + d + '">&times;</button>' +
      '</span>'
    ).join('');

    list.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        DataStore.removeClosedDate(btn.dataset.date);
        renderClosedDates();
      });
    });
  }

  document.getElementById('addClosedDateBtn').addEventListener('click', () => {
    const input = document.getElementById('newClosedDate');
    const val = input.value;
    if (val && !closedDates.includes(val)) {
      DataStore.addClosedDate(val);
      input.value = '';
      renderClosedDates();
    }
  });

  // ── Add Employee ───────────────────────────────────────────
  const addBtn = document.getElementById('addEmployeeBtn');
  const addForm = document.getElementById('addEmployeeForm');

  addBtn.addEventListener('click', () => {
    addForm.classList.toggle('visible');
  });

  document.getElementById('cancelAddEmp').addEventListener('click', () => {
    addForm.classList.remove('visible');
  });

  document.getElementById('confirmAddEmp').addEventListener('click', () => {
    const name = document.getElementById('newEmpName').value.trim();
    const role = document.getElementById('newEmpRole').value;
    const color = document.getElementById('newEmpColor').value;

    if (!name) return;

    DataStore.addEmployee({ name: name, role: role, color: color });

    document.getElementById('newEmpName').value = '';
    addForm.classList.remove('visible');
    renderEmployeeCards();
    showToast('Employee added!');
  });

  // ── Init ───────────────────────────────────────────────────
  renderScheduleSection();

});
