/* Аналитика: все вызовы gtag в одном файле (ТЗ 4.3) */
(function () {
  'use strict';

  // ТЗ 4.6: debug_mode включаем только на время проверки, затем false
  var GA_ID = 'G-XXXXXXXXXX';
  var DEBUG = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, { debug_mode: DEBUG, send_page_view: true });

  // ---- Хелперы ----
  function send(eventName, params) {
    gtag('event', eventName, params || {});
  }

  // UTM-метки: читаем из URL и сохраняем в sessionStorage (ТЗ 6.3)
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var stored = {};
  try { stored = JSON.parse(sessionStorage.getItem('akkord_utm') || '{}'); } catch (e) { stored = {}; }
  var urlParams = new URLSearchParams(location.search);
  UTM_KEYS.forEach(function (k) {
    var v = urlParams.get(k);
    if (v) stored[k] = v;
  });
  try { sessionStorage.setItem('akkord_utm', JSON.stringify(stored)); } catch (e) {}
  window.AKKORD_UTM = {
    utm_source: stored.utm_source || 'direct',
    utm_medium: stored.utm_medium || 'none',
    utm_campaign: stored.utm_campaign || 'not_set',
    utm_content: stored.utm_content || 'not_set'
  };

  // ---- Декларативные события по data-атрибутам ----
  // Пример: <button data-event="cta_click" data-button-name="hero_trial" data-page-section="hero">
  function paramize(el) {
    var p = {};
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      if (a.name.indexOf('data-') === 0 && a.name !== 'data-event') {
        var key = a.name.slice(5).replace(/-([a-z])/g, function (_, c) { return '_' + c; });
        p[key] = String(a.value).slice(0, 100);
      }
    }
    return p;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-event]');
    if (!el) return;
    send(el.getAttribute('data-event'), paramize(el));
  });

  // ---- contact_click: tel: и mailto: ----
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!a) return;
    send('contact_click', { contact_type: a.href.indexOf('tel:') === 0 ? 'phone' : 'email' });
  });

  // ---- messenger_click ----
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-messenger]');
    if (!a) return;
    send('messenger_click', { messenger: a.getAttribute('data-messenger') });
  });

  // ---- social_click ----
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-social]');
    if (!a) return;
    send('social_click', {
      network: a.getAttribute('data-social'),
      page_section: a.getAttribute('data-section') || 'footer'
    });
  });

  // ---- video_play: один раз за просмотр страницы (ТЗ 3.3) ----
  var videoSent = false;
  document.addEventListener('play', function (e) {
    if (e.target.tagName !== 'VIDEO' || videoSent) return;
    videoSent = true;
    send('video_play', { video_title: e.target.getAttribute('data-title') || 'student_video' });
  }, true);

  // ---- faq_open ----
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-q');
    if (!btn) return;
    if (btn.parentElement.classList.contains('open')) {
      send('faq_open', { question_id: btn.getAttribute('data-q') || 'q' });
    }
  });

  // ---- promo_copy ----
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-promo]');
    if (!btn) return;
    var code = btn.getAttribute('data-promo');
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(function () {});
    send('promo_copy', { promo_code: code });
    var label = btn.querySelector('[data-label]');
    if (label) { var old = label.textContent; label.textContent = 'Скопировано!'; setTimeout(function () { label.textContent = old; }, 1800); }
  });

  // ---- instrument_select / level_select / teacher_view / select_tariff ----
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-instrument]');
    if (t && t.getAttribute('data-action') === 'instrument_select') {
      send('instrument_select', { instrument: t.getAttribute('data-instrument') });
    }
  });
  document.addEventListener('change', function (e) {
    var s = e.target.closest('select[data-action="level_select"], input[data-action="level_select"]');
    if (s) send('level_select', { level: s.value });
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-action="level_select"]');
    if (b && b.tagName === 'BUTTON') send('level_select', { level: b.getAttribute('data-level') });
  });
})();