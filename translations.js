// ══════════════════════════════════════════════════════════════
//  SewReady — Internationalization (i18n) Framework
//  EN / KO bilingual support
// ══════════════════════════════════════════════════════════════

const TRANSLATIONS = {
  en: {
    // Nav
    'nav.services': 'Services',
    'nav.supplies': 'Supplies',
    'nav.about': 'About',
    'nav.signin': 'Sign In',
    'nav.signout': 'Sign Out',

    // Hero
    'hero.title': 'Military-Grade Sewing.<br>Mission-Ready Uniforms.',
    'hero.sub': 'Professional uniform alterations & embroidery. AR 670-1 compliant. Trusted by soldiers at Fort Liberty.',
    'hero.track': 'Track My Order',
    'hero.order': 'Make an Order',
    'hero.team': 'Meet the Team',

    // Schedule
    'schedule.title': 'Our Schedule',
    'schedule.sub': "See when we're open. Click a day to book an appointment.",
    'schedule.hours': 'Shop Hours',
    'schedule.location': 'Location',

    // Tracker
    'tracker.title': 'Track Your Order',
    'tracker.sub': 'No account needed. Enter your order number and phone to check status.',
    'tracker.orderPlaceholder': 'Order # (e.g. SR-001)',
    'tracker.phonePlaceholder': 'Phone (e.g. (555) 201-4488)',
    'tracker.btn': 'Track',
    'tracker.notFound': 'No order found. Check your order number and phone number.',
    'tracker.enterBoth': 'Enter both order number and phone',

    // Trust
    'trust.orders': 'Orders Completed',
    'trust.compliant': 'Compliant',
    'trust.rush': 'Rush Available',
    'trust.rating': 'Rating',

    // Services
    'services.title': 'Our Services',
    'services.sub': '55 services across 5 categories. Everything your uniform needs.',
    'services.showAll': 'Show All {count} Services',
    'services.showLess': 'Show Less',

    // Inventory
    'inventory.title': 'Supplies & Inventory',
    'inventory.sub': '35 items in stock. Tapes, patches, insignia, badges, and more.',
    'inventory.showAll': 'Show All {count} Items',
    'inventory.showLess': 'Show Less',
    'inventory.outOfStock': 'Out of Stock',
    'inventory.left': '{count} left',
    'inventory.inStock': '{count} in stock',

    // Team
    'team.title': 'Meet the Team',
    'team.sub': 'Skilled professionals dedicated to keeping you mission-ready.',

    // Auth
    'auth.signin': 'Sign In',
    'auth.create': 'Create Account',
    'auth.signinBtn': 'Sign In',
    'auth.createBtn': 'Create Account',
    'auth.demo': 'Demo: rodriguez.j@army.mil / demo123',
    'auth.invalidCreds': 'Invalid email or password',
    'auth.fillAll': 'Please fill in all required fields',
    'auth.emailExists': 'An account with that email already exists',

    // Dashboard
    'dash.myOrders': 'My Orders',
    'dash.newOrder': 'Place New Order',
    'dash.welcome': 'Welcome back, {name}',
    'dash.activeOrders': '{count} active order',
    'dash.activeOrdersPlural': '{count} active orders',
    'dash.noOrders': 'No orders yet. Place your first order below!',

    // Wizard
    'wizard.step1': 'Item(s)',
    'wizard.step2': 'Services',
    'wizard.step3': 'Details',
    'wizard.step4': 'Review',
    'wizard.back': 'Back',
    'wizard.next': 'Next',
    'wizard.submit': 'Submit Order',
    'wizard.selectItems': 'Select Item(s)',
    'wizard.selectServices': 'Select Services',
    'wizard.details': 'Details & Scheduling',
    'wizard.review': 'Review Your Order',
    'wizard.selectAtLeastItem': 'Select at least one item',
    'wizard.selectAtLeastService': 'Select at least one service',
    'wizard.servicesAvailable': '{count} services available for this item',
    'wizard.addToOrder': 'Add to Order',
    'wizard.update': 'Update',
    'wizard.selectedItems': 'Selected Items',
    'wizard.showingFor': 'Showing services for:',
    'wizard.total': 'Total:',
    'wizard.itemSource': 'Item source:',
    'wizard.bringingOwn': 'Bringing my own',
    'wizard.needPurchase': 'Need to purchase',
    'wizard.nameForTape': 'Name for tape:',
    'wizard.rank': 'Rank:',
    'wizard.whenDone': 'When do you need this done?',
    'wizard.whenDropoff': 'When can you drop it off? (optional)',
    'wizard.specialInstructions': 'Special Instructions (optional)',
    'wizard.driverBannerTitle': 'Need pickup or delivery? Schedule a SewReady Driver',
    'wizard.driverBannerSub': 'Have your uniforms picked up and delivered — coming soon!',
    'wizard.driverComingSoon': 'Driver pickup coming soon! For now, please drop off in store.',
    'wizard.reviewItems': 'Items',
    'wizard.reviewServices': 'Services',
    'wizard.reviewTime': 'Estimated Time',
    'wizard.reviewNeedBy': 'Need By',
    'wizard.reviewDropoff': 'Drop-off Appointment',
    'wizard.reviewNotes': 'Special Instructions',
    'wizard.orderSubmitted': 'Order {id} submitted! Bring your items to the shop to get started.',
    'wizard.noSlots': 'No available slots for this date.',
    'wizard.availableTimes': 'Available Times',

    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty.',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.addedToCart': '{name} added to cart',
    'cart.service': 'Service',
    'cart.supply': 'Supply',
    'cart.cartLoaded': 'Cart services loaded — select your item(s) to continue',

    // Chat
    'chat.greeting': "Hi! I'm the SewReady assistant. How can I help you today?",
    'chat.hours': 'What are your hours?',
    'chat.showServices': 'Show services',
    'chat.trackOrder': 'Track my order',
    'chat.stockQuestion': 'What do you have in stock?',
    'chat.placeholder': 'Ask about services, hours, orders...',
    'chat.fallback': "I'm not sure about that. Try asking about our <strong>services</strong>, <strong>hours</strong>, <strong>inventory</strong>, or <strong>order tracking</strong>.",

    // Calendar (big)
    'bigcal.closed': 'Closed',
    'bigcal.today': 'Today',

    // Status labels
    'status.received': 'Received',
    'status.inProgress': 'In Progress',
    'status.ready': 'Ready for Pickup',
    'status.completed': 'Completed',
    'status.pending': 'Pending Drop-off',

    // Category labels
    'cat.all': 'All',
    'cat.creation': 'Creation',
    'cat.sewing': 'Sewing / Attach',
    'cat.removal': 'Removal',
    'cat.combo': 'Combo / Bundle',
    'cat.alteration': 'Alteration',

    // Day names
    'day.sunday': 'Sunday',
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wednesday': 'Wednesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    'day.sun': 'Sun', 'day.mon': 'Mon', 'day.tue': 'Tue',
    'day.wed': 'Wed', 'day.thu': 'Thu', 'day.fri': 'Fri', 'day.sat': 'Sat',

    // Month names
    'month.jan': 'Jan', 'month.feb': 'Feb', 'month.mar': 'Mar',
    'month.apr': 'Apr', 'month.may': 'May', 'month.jun': 'Jun',
    'month.jul': 'Jul', 'month.aug': 'Aug', 'month.sep': 'Sep',
    'month.oct': 'Oct', 'month.nov': 'Nov', 'month.dec': 'Dec',
    'month.january': 'January', 'month.february': 'February', 'month.march': 'March',
    'month.april': 'April', 'month.may_full': 'May', 'month.june': 'June',
    'month.july': 'July', 'month.august': 'August', 'month.september': 'September',
    'month.october': 'October', 'month.november': 'November', 'month.december': 'December',

    // Employee page
    'emp.thisWeek': 'This Week',
    'emp.todayOrders': "Today's Orders",
    'emp.upcomingOrders': 'Upcoming Orders',
    'emp.requestShift': 'Request Shift Change',
    'emp.submitRequest': 'Submit Request',
    'emp.noOrders': 'No orders assigned.',
    'emp.notFound': 'Employee not found. Check the URL.',
    'emp.selectDate': 'Please select a date.',
    'emp.requestSubmitted': 'Request submitted!',
    'emp.off': 'Off',
    'emp.pendingDropoff': 'Pending Drop-off',
    'emp.date': 'Date',
    'emp.reqType': 'Request Type',
    'emp.dayOff': 'Day Off',
    'emp.changeHours': 'Change Hours',
    'emp.swapCoworker': 'Swap With Coworker',
    'emp.startTime': 'Start Time',
    'emp.endTime': 'End Time',
    'emp.swapWith': 'Swap With',
    'emp.reason': 'Reason',
    'emp.reasonPlaceholder': 'Why are you requesting this change?',

    // Footer
    'footer.copy': '© 2026 SewReady — Maria\'s Alterations. All rights reserved.',

    // Quick actions
    'quick.callShop': 'Call Shop',
    'quick.directions': 'Get Directions',

    // Call-to-action
    'cta.callNow': 'Call Now',
    'cta.getDirections': 'Get Directions',

    // Misc
    'misc.addToCart': '+ Cart',
    'misc.min': 'min',
    'misc.due': 'Due:',
    'misc.bringingOwn': 'bringing own',
    'misc.needsPurchase': 'needs purchase',
    'misc.customerProviding': 'customer providing'
  },

  ko: {
    // Nav
    'nav.services': '서비스',
    'nav.supplies': '용품',
    'nav.about': '소개',
    'nav.signin': '로그인',
    'nav.signout': '로그아웃',

    // Hero
    'hero.title': '군용 등급 봉제 기술.<br>실전 대비 완벽한 군복.',
    'hero.sub': '전문 군복 수선 및 자수. AR 670-1 규정 준수. 포트 리버티 장병들이 신뢰하는 서비스.',
    'hero.track': '주문 추적',
    'hero.order': '주문하기',
    'hero.team': '팀 소개',

    // Schedule
    'schedule.title': '운영 시간',
    'schedule.sub': '영업 시간을 확인하세요. 날짜를 클릭하여 예약할 수 있습니다.',
    'schedule.hours': '영업 시간',
    'schedule.location': '위치',

    // Tracker
    'tracker.title': '주문 추적',
    'tracker.sub': '계정 없이 이용 가능합니다. 주문 번호와 전화번호를 입력하세요.',
    'tracker.orderPlaceholder': '주문번호 (예: SR-001)',
    'tracker.phonePlaceholder': '전화번호 (예: (555) 201-4488)',
    'tracker.btn': '조회',
    'tracker.notFound': '주문을 찾을 수 없습니다. 주문 번호와 전화번호를 확인해주세요.',
    'tracker.enterBoth': '주문 번호와 전화번호를 모두 입력하세요',

    // Trust
    'trust.orders': '완료된 주문',
    'trust.compliant': '규정 준수',
    'trust.rush': '급행 가능',
    'trust.rating': '평점',

    // Services
    'services.title': '서비스 안내',
    'services.sub': '5개 카테고리, 55가지 서비스. 군복에 필요한 모든 것.',
    'services.showAll': '전체 {count}개 서비스 보기',
    'services.showLess': '접기',

    // Inventory
    'inventory.title': '용품 및 재고',
    'inventory.sub': '35가지 재고 품목. 테이프, 패치, 계급장, 배지 등.',
    'inventory.showAll': '전체 {count}개 품목 보기',
    'inventory.showLess': '접기',
    'inventory.outOfStock': '품절',
    'inventory.left': '{count}개 남음',
    'inventory.inStock': '{count}개 재고',

    // Team
    'team.title': '팀 소개',
    'team.sub': '여러분의 임무 준비를 위해 헌신하는 전문가들입니다.',

    // Auth
    'auth.signin': '로그인',
    'auth.create': '계정 만들기',
    'auth.signinBtn': '로그인',
    'auth.createBtn': '계정 만들기',
    'auth.demo': '데모: rodriguez.j@army.mil / demo123',
    'auth.invalidCreds': '이메일 또는 비밀번호가 올바르지 않습니다',
    'auth.fillAll': '모든 필수 항목을 입력해주세요',
    'auth.emailExists': '이미 등록된 이메일입니다',

    // Dashboard
    'dash.myOrders': '내 주문',
    'dash.newOrder': '새 주문',
    'dash.welcome': '{name}님, 환영합니다',
    'dash.activeOrders': '진행중 주문 {count}건',
    'dash.activeOrdersPlural': '진행중 주문 {count}건',
    'dash.noOrders': '아직 주문이 없습니다. 아래에서 첫 주문을 하세요!',

    // Wizard
    'wizard.step1': '품목',
    'wizard.step2': '서비스',
    'wizard.step3': '상세',
    'wizard.step4': '확인',
    'wizard.back': '이전',
    'wizard.next': '다음',
    'wizard.submit': '주문 제출',
    'wizard.selectItems': '품목 선택',
    'wizard.selectServices': '서비스 선택',
    'wizard.details': '상세 정보 및 일정',
    'wizard.review': '주문 검토',
    'wizard.selectAtLeastItem': '품목을 하나 이상 선택하세요',
    'wizard.selectAtLeastService': '서비스를 하나 이상 선택하세요',
    'wizard.servicesAvailable': '이 품목에 대해 {count}개 서비스 이용 가능',
    'wizard.addToOrder': '주문에 추가',
    'wizard.update': '수정',
    'wizard.selectedItems': '선택된 품목',
    'wizard.showingFor': '표시 중:',
    'wizard.total': '합계:',
    'wizard.itemSource': '품목 제공:',
    'wizard.bringingOwn': '본인 지참',
    'wizard.needPurchase': '구매 필요',
    'wizard.nameForTape': '테이프 이름:',
    'wizard.rank': '계급:',
    'wizard.whenDone': '언제까지 필요하신가요?',
    'wizard.whenDropoff': '언제 맡기실 수 있나요? (선택사항)',
    'wizard.specialInstructions': '특별 요청사항 (선택사항)',
    'wizard.driverBannerTitle': '픽업/배달이 필요하신가요? SewReady 드라이버 예약',
    'wizard.driverBannerSub': '군복 픽업 및 배달 서비스 — 곧 출시!',
    'wizard.driverComingSoon': '드라이버 픽업 서비스가 곧 출시됩니다! 현재는 매장에 직접 방문해주세요.',
    'wizard.reviewItems': '품목',
    'wizard.reviewServices': '서비스',
    'wizard.reviewTime': '예상 소요 시간',
    'wizard.reviewNeedBy': '필요일',
    'wizard.reviewDropoff': '접수 예약',
    'wizard.reviewNotes': '특별 요청사항',
    'wizard.orderSubmitted': '주문 {id} 접수 완료! 품목을 매장에 가져오시면 시작합니다.',
    'wizard.noSlots': '해당 날짜에 가능한 시간이 없습니다.',
    'wizard.availableTimes': '가능한 시간',

    // Cart
    'cart.title': '장바구니',
    'cart.empty': '장바구니가 비어 있습니다.',
    'cart.total': '합계',
    'cart.checkout': '결제하기',
    'cart.addedToCart': '{name} 장바구니에 추가됨',
    'cart.service': '서비스',
    'cart.supply': '용품',
    'cart.cartLoaded': '장바구니 서비스 불러옴 — 품목을 선택하여 계속하세요',

    // Chat
    'chat.greeting': '안녕하세요! SewReady 도우미입니다. 무엇을 도와드릴까요?',
    'chat.hours': '영업 시간이 어떻게 되나요?',
    'chat.showServices': '서비스 보기',
    'chat.trackOrder': '주문 추적하기',
    'chat.stockQuestion': '재고가 어떤 것이 있나요?',
    'chat.placeholder': '서비스, 영업 시간, 주문 등을 질문하세요...',
    'chat.fallback': '잘 모르겠습니다. <strong>서비스</strong>, <strong>영업 시간</strong>, <strong>재고</strong>, 또는 <strong>주문 추적</strong>에 대해 질문해보세요.',

    // Calendar (big)
    'bigcal.closed': '휴무',
    'bigcal.today': '오늘',

    // Status labels
    'status.received': '접수 완료',
    'status.inProgress': '작업 중',
    'status.ready': '수령 가능',
    'status.completed': '완료',
    'status.pending': '접수 대기',

    // Category labels
    'cat.all': '전체',
    'cat.creation': '제작',
    'cat.sewing': '봉제 / 부착',
    'cat.removal': '제거',
    'cat.combo': '콤보 / 번들',
    'cat.alteration': '수선',

    // Day names
    'day.sunday': '일요일',
    'day.monday': '월요일',
    'day.tuesday': '화요일',
    'day.wednesday': '수요일',
    'day.thursday': '목요일',
    'day.friday': '금요일',
    'day.saturday': '토요일',
    'day.sun': '일', 'day.mon': '월', 'day.tue': '화',
    'day.wed': '수', 'day.thu': '목', 'day.fri': '금', 'day.sat': '토',

    // Month names
    'month.jan': '1월', 'month.feb': '2월', 'month.mar': '3월',
    'month.apr': '4월', 'month.may': '5월', 'month.jun': '6월',
    'month.jul': '7월', 'month.aug': '8월', 'month.sep': '9월',
    'month.oct': '10월', 'month.nov': '11월', 'month.dec': '12월',
    'month.january': '1월', 'month.february': '2월', 'month.march': '3월',
    'month.april': '4월', 'month.may_full': '5월', 'month.june': '6월',
    'month.july': '7월', 'month.august': '8월', 'month.september': '9월',
    'month.october': '10월', 'month.november': '11월', 'month.december': '12월',

    // Employee page
    'emp.thisWeek': '이번 주',
    'emp.todayOrders': '오늘의 주문',
    'emp.upcomingOrders': '예정된 주문',
    'emp.requestShift': '근무 변경 요청',
    'emp.submitRequest': '요청 제출',
    'emp.noOrders': '배정된 주문이 없습니다.',
    'emp.notFound': '직원을 찾을 수 없습니다. URL을 확인하세요.',
    'emp.selectDate': '날짜를 선택하세요.',
    'emp.requestSubmitted': '요청이 제출되었습니다!',
    'emp.off': '휴무',
    'emp.pendingDropoff': '접수 대기',
    'emp.date': '날짜',
    'emp.reqType': '요청 유형',
    'emp.dayOff': '휴무',
    'emp.changeHours': '시간 변경',
    'emp.swapCoworker': '동료와 교대',
    'emp.startTime': '시작 시간',
    'emp.endTime': '종료 시간',
    'emp.swapWith': '교대 대상',
    'emp.reason': '사유',
    'emp.reasonPlaceholder': '변경을 요청하는 이유를 입력하세요',

    // Footer
    'footer.copy': '© 2026 SewReady — Maria\'s Alterations. 모든 권리 보유.',

    // Quick actions
    'quick.callShop': '매장 전화',
    'quick.directions': '길찾기',

    // Call-to-action
    'cta.callNow': '전화하기',
    'cta.getDirections': '길찾기',

    // Misc
    'misc.addToCart': '+ 담기',
    'misc.min': '분',
    'misc.due': '마감:',
    'misc.bringingOwn': '본인 지참',
    'misc.needsPurchase': '구매 필요',
    'misc.customerProviding': '고객 제공'
  }
};

// ── Language State ──────────────────────────────────────────
function getCurrentLang() {
  return localStorage.getItem('sewready-lang') || 'en';
}

function setLanguage(lang) {
  localStorage.setItem('sewready-lang', lang);
  sweepDOM();
  document.dispatchEvent(new CustomEvent('language-changed', { detail: { lang: lang } }));
  // Update toggle button label
  var btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'ko' ? '한 | EN' : 'EN | 한';
}

function toggleLanguage() {
  var current = getCurrentLang();
  setLanguage(current === 'en' ? 'ko' : 'en');
}

// ── Translation Function ───────────────────────────────────
function t(key, replacements) {
  var lang = getCurrentLang();
  var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  var str = dict[key];
  if (str === undefined) {
    // Fallback to English
    str = TRANSLATIONS.en[key];
  }
  if (str === undefined) return key;
  if (replacements) {
    Object.keys(replacements).forEach(function(k) {
      str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), replacements[k]);
    });
  }
  return str;
}

// ── DOM Sweep ──────────────────────────────────────────────
function sweepDOM() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var translated = t(key);
    if (translated !== key) el.innerHTML = translated;
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    var translated = t(key);
    if (translated !== key) el.placeholder = translated;
  });
  // Titles
  document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-title');
    var translated = t(key);
    if (translated !== key) el.title = translated;
  });
}

// ── Init: Apply saved language on load ─────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var lang = getCurrentLang();
  var btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'ko' ? '한 | EN' : 'EN | 한';
  sweepDOM();
});
