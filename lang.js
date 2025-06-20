const translations = {
  ru: {
    "catalog": "Каталог манги",
    "login": "Вход / Регистрация",
    "main": "Главная",
    "genres": "Жанры",
    "titles": "Тайтлы",
    "new": "Новое",
    "about": "О нас",
    "action": "Экшен",
    "fantasy": "Фэнтези",
    "romance": "Романтика",
    "comedy": "Комедия"
    // ...добавь остальные жанры и тексты
  },
  uk: {
    "catalog": "Каталог манґи",
    "login": "Вхід / Реєстрація",
    "main": "Головна",
    "genres": "Жанри",
    "titles": "Тайтли",
    "new": "Нове",
    "about": "Про нас",
    "action": "Екшн",
    "fantasy": "Фентезі",
    "romance": "Романтика",
    "comedy": "Комедія"
    // ...добавь остальные жанры и тексты
  },
  en: {
    "catalog": "Manga Catalog",
    "login": "Login / Register",
    "main": "Home",
    "genres": "Genres",
    "titles": "Titles",
    "new": "New",
    "about": "About Us",
    "action": "Action",
    "fantasy": "Fantasy",
    "romance": "Romance",
    "comedy": "Comedy"
    // ...add more genres and texts as needed
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem('manga_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  // click handlers for language menu
  document.querySelectorAll('.lang-list a[data-lang]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage(this.getAttribute('data-lang'));
    });
  });
  // set language on page load
  const saved = localStorage.getItem('manga_lang') || 'ru';
  setLanguage(saved);
});
