<div align="center">
  <h1>🎸 Музыкальная школа «Аккорд»</h1>
  <p><b>Полный кейс: Разработка сайта, сквозная аналитика и система приёма заявок</b></p>
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/Google%20Analytics-E37400?style=for-the-badge&logo=google-analytics&logoColor=white" alt="GA4" />
    <img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Apps Script" />
  </p>
</div>

---

## 🔗 Ссылки на проект

| Ресурс | Ссылка / Значение | Статус |
| :--- | :--- | :--- |
| **🌍 Живой сайт (Vercel)** | **[https://muzykalnaya-shkola-akkord.vercel.app/](https://muzykalnaya-shkola-akkord.vercel.app/)** | ✅ Активен |
| **📊 Google Таблица (Заявки)** | **[https://docs.google.com/spreadsheets/d/1ze-oa8-WpxGMRNj676tqbwHazcXYZAAoaRNMx5L7ZaA/edit](https://docs.google.com/spreadsheets/d/1ze-oa8-WpxGMRNj676tqbwHazcXYZAAoaRNMx5L7ZaA/edit)** | ✅ Активен |
| **📈 Дашборд Yandex DataLens** | **[https://datalens.ru/5fq3m4mxeg98o-akkord-song-by-ny-2026?_share_link=org](https://datalens.ru/5fq3m4mxeg98o-akkord-song-by-ny-2026?_share_link=org)** | ✅ Активен |
| **📱 Публикация ВКонтакте** | **[https://vk.ru/club242705615](https://vk.ru/club242705615)** | ✅ Опубликовано |
| **✈️ Публикация Telegram** | **[https://t.me/musicschoolakkord](https://t.me/musicschoolakkord)** | ✅ Опубликовано |
| **▶️ Публикация YouTube** | **[https://www.youtube.com/@MusicSchoolAkkord](https://www.youtube.com/@MusicSchoolAkkord)** | ✅ Опубликовано |
| **📌 Публикация Pinterest** | **[https://ru.pinterest.com/musicschoolakkord/](https://ru.pinterest.com/musicschoolakkord/)** | ✅ Опубликовано |
| **🎬 Автоответы (Telegram-бот)** | **[https://t.me/akkord_helper_bot](https://t.me/akkord_helper_bot)** *(замените на своего бота, если имя другое)* | ✅ Настроено |

---

## 📊 Настройки веб-аналитики (GA4)

* **Идентификатор ресурса (Measurement ID):** `G-SXRLS6JNV7`
* **Доступ Viewer выдан:** `musicschoolakkord@gmail.com` 
* **Часовой пояс:** (GMT+03:00) Москва
* **Валюта:** Российский рубль (RUB)
* **Ключевые события (Key events):** `generate_lead`, `contact_click`, `messenger_click`.
* **Пользовательские параметры (Custom definitions):** `button_name`, `page_section`, `instrument`, `level`, `chord_name`, `lead_instrument`, `messenger`.

---

## 🚀 Технологический стек

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+). Без использования тяжелых фреймворков (React, Vue) и сборщиков (Webpack, Vite) — строго по ТЗ.
*   **Стилизация:** Чистый CSS (Flexbox, CSS Grid, CSS-переменные). Адаптивная верстка Mobile-first.
*   **Шрифты:** Google Fonts (Playfair Display для акцентных заголовков, Inter для основного текста).
*   **Звук:** Web Audio API (синтез звуковых волн).
*   **Аналитика:** Google Analytics 4 (gtag.js).
*   **Бэкенд для заявок:** Google Apps Script (serverless-решение на базе Google).
*   **Хостинг и CI/CD:** GitHub + Vercel (автоматический деплой при push в ветку `main`).

---

## 📂 Архитектура и структура файлов

```text
tz-15-muzykalnaya-shkola-akkord/
│
├── index.html          # Главная страница
├── instruments.html    # Страница с карточками инструментов
├── teachers.html       # Страница с карточками преподавателей
├── prices.html         # Цены, абонементы и FAQ
├── chords.html         # 5 аккордов со звуком (Web Audio API)
├── contacts.html       # Форма заявки и контакты
├── thanks.html         # Страница подтверждения записи
├── privacy.html        # Политика конфиденциальности (152-ФЗ)
├── 404.html            # Страница обработки ошибок
│
├── css/
│   └── style.css       # Единые стили, адаптивность, переменные брендбука
│
├── js/
│   ├── analytics.js    # Скрипт интеграции с GA4, сбор UTM-меток
│   ├── form.js         # Валидация формы, отправка в Apps Script
│   └── chords.js       # Скрипт синтеза звука для аккордов
│
├── img/                # Изображения (WebP/JPEG, до 300 КБ)
│
├── apps-script/
│   └── Code.gs         # Код приёмника заявок для Google Таблиц
│
├── docs/               # Документация проекта
│   ├── prompts.md      # Журнал запросов к нейросети
│   ├── events.md       # Таблица всех событий GA4 с параметрами
│   ├── utm.csv         # Реестр UTM-ссылок для соцсетей
│   ├── images.md       # Источники изображений
│   ├── report.md       # Аналитическая записка
│   └── qr-u-12.png     # QR-код для афиши
│
├── screens/            # Скриншоты для отчета
│   ├── ga4/            # Скриншоты событий из DebugView
│   ├── utm/            # Скриншоты переходов по ссылкам
│   ├── telegram/       # Скриншоты автоответов (вместо Instagram)
│   ├── reports/        # Отчеты GA4
│   ├── explore/        # Исследования GA4
│   ├── datalens/       # Скриншоты дашборда
│   └── lighthouse/     # Отчет о производительности
│
├── vercel.json         # Настройки маршрутизации для Vercel
└── README.md           # Этот файл
