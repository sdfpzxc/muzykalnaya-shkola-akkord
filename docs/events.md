# Таблица событий Google Analytics 4

В проекте реализовано 20 событий. Все вызовы `gtag('event', ...)` находятся в файле `js/analytics.js`.

| № | Событие | Тип | Где отправляется (файл) | Параметры (пример) |
|---|---|---|---|---|
| 1 | `page_view` | Авто | Все страницы | `page_location`, `page_title` |
| 2 | `scroll` | Авто | Все страницы | `percent_scrolled: 90` |
| 3 | `click` | Авто | Все страницы | `link_url`, `outbound: true` |
| 4 | `file_download` | Авто | `prices.html` | `file_name: price.pdf` |
| 5 | `form_start` | Авто | `contacts.html` | `form_id: lead-form` |
| 6 | `form_submit` | Авто | `contacts.html` | `form_id: lead-form` |
| 7 | `generate_lead` | Рекоменд. | `js/form.js` | `lead_instrument: guitar`, `lead_level: zero`, `lead_source: vk` |
| 8 | `cta_click` | Своё | Все страницы | `button_name: hero_trial`, `page_section: hero` |
| 9 | `instrument_select` | Своё | `index.html`, `instruments.html` | `instrument: guitar` |
| 10 | `level_select` | Своё | `instruments.html` | `level: zero` |
| 11 | `teacher_view` | Своё | `teachers.html` | `teacher_id: anna`, `instrument: guitar` |
| 12 | `select_tariff` | Своё | `prices.html` | `tariff_name: pack4`, `tariff_price: 6800` |
| 13 | `chord_play` | Своё | `chords.html` | `chord_name: Am` |
| 14 | `promo_copy` | Своё | `chords.html` | `promo_code: CHORD500` |
| 15 | `contact_click` | Своё | Все страницы | `contact_type: phone` |
| 16 | `messenger_click` | Своё | `contacts.html` | `messenger: telegram` |
| 17 | `social_click` | Своё | Подвал, `thanks.html` | `network: vk`, `page_section: footer` |
| 18 | `form_error` | Своё | `js/form.js` | `field_name: phone`, `error_type: validation` |
| 19 | `video_play` | Своё | `index.html` | `video_title: student_4_lessons` |
| 20 | `faq_open` | Своё | `prices.html` | `question_id: 1` |

*Все 7 обязательных пользовательских параметров (Custom definitions) зарегистрированы в GA4 (Admin -> Custom definitions).*