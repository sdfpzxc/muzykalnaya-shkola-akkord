/* Форма заявки: отправка без перезагрузки, UTM из sessionStorage (ТЗ 6.3) */
(function () {
  'use strict';
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTe__kSpv7ihCB2eQZ6bsJkelguaU9yavk9U7zcHFja7UYrYRep0PltNoUrO43bFw7Gw/exec'; 
  var form = document.getElementById('lead-form');
  if (!form) return;

  var utm = window.AKKORD_UTM || { utm_source: 'direct', utm_medium: 'none', utm_campaign: 'not_set', utm_content: 'not_set' };

  // Подставляем UTM в скрытые поля
  Object.keys(utm).forEach(function (k) {
    var el = form.querySelector('input[name="' + k + '"]');
    if (el) el.value = utm[k];
  });

  // request_id генерируем один раз
  var ridInput = form.querySelector('input[name="request_id"]');
  if (ridInput && !ridInput.value) ridInput.value = 'REQ-' + uuid();

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function setError(field, msg) {
    var wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.add('error');
    var em = wrap.querySelector('.err-msg');
    if (em) em.textContent = msg;
  }
  function clearErrors() {
    form.querySelectorAll('.field.error').forEach(function (f) { f.classList.remove('error'); });
  }
  function showStatus(text, cls) {
    var s = form.querySelector('.form-status');
    if (!s) return;
    s.textContent = text;
    s.className = 'form-status ' + cls;
  }

  function validate() {
    clearErrors();
    var ok = true;
    var name = form.name;
    var phone = form.phone;
    var email = form.email;
    var instrument = form.instrument;
    var level = form.level;
    var time = form.preferred_time;
    var consent = form.querySelector('input[name="consent"]');

    if (!name.value.trim() || name.value.trim().length < 2) {
      setError(name, 'Укажите имя (2–60 символов)'); ok = false;
    }
    
    // Надежная проверка телефона
    var digits = phone.value.replace(/\D/g, '');
    if (digits.charAt(0) === '8') digits = '7' + digits.slice(1);
    if (digits.charAt(0) !== '7') digits = '7' + digits;
    
    if (digits.length !== 11) {
      setError(phone, 'Введите корректный номер (11 цифр)'); ok = false;
    }

    if (email.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      setError(email, 'Проверьте e-mail'); ok = false;
    }
    if (!instrument.value) { setError(instrument, 'Выберите инструмент'); ok = false; }
    if (!level.value) { setError(level, 'Выберите уровень'); ok = false; }
    if (!time.value) { setError(time, 'Выберите удобное время'); ok = false; }
    if (!consent.checked) {
      setError(consent, 'Нужно согласие на обработку данных'); ok = false;
    }
    return ok;
  }

  // Маска телефона: +7 (XXX) XXX-XX-XX
  var phoneInput = form.phone;
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var d = phoneInput.value.replace(/\D/g, '');
      if (d.charAt(0) === '8') d = '7' + d.slice(1);
      if (d.charAt(0) !== '7') d = '7' + d;
      d = d.slice(0, 11);
      var out = '+7';
      if (d.length > 1) out += ' (' + d.slice(1, 4);
      if (d.length >= 5) out += ') ' + d.slice(4, 7);
      if (d.length >= 8) out += '-' + d.slice(7, 9);
      if (d.length >= 10) out += '-' + d.slice(9, 11);
      phoneInput.value = out;
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstErr = form.querySelector('.field.error input, .field.error select');
      if (firstErr) {
        gtag('event', 'form_error', {
          field_name: firstErr.name,
          error_type: 'validation'
        });
      }
      showStatus('Проверьте выделенные поля', 'fail');
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    showStatus('Отправляем…', 'ok');

    var data = Object.fromEntries(new FormData(form).entries());
    delete data.consent;

    // === ХИТРЫЙ ОБХОД CORS ===
    // Отправляем запрос в режиме no-cors, чтобы браузер не блокировал ответ
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // <--- ГЛАВНЫЙ ФИКС
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    })
    .then(function () {
      // При режиме no-cors мы не можем прочитать ответ (ok: true или false), 
      // поэтому просто считаем, что раз запрос ушел, то всё хорошо.
      
      // Отправляем событие в GA4
      gtag('event', 'generate_lead', {
        lead_instrument: data.instrument,
        lead_level: data.level,
        lead_source: data.utm_source
      });
      
      // Перекидываем на страницу Спасибо
      window.location.href = 'thanks.html?id=' + encodeURIComponent(data.request_id);
    })
    .catch(function (err) {
      // Сюда мы попадем только если пропал интернет
      btn.disabled = false;
      showStatus('Не удалось отправить. Проверьте интернет.', 'fail');
      gtag('event', 'form_error', { field_name: 'server', error_type: 'network' });
    });
  });
})();