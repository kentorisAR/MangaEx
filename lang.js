const translations = {
  ru: {
    "catalog": "Каталог манги",
    "login": "Вход / Регистрация",
    "main": "Главная",
    "genres": "Жанры",
    "titles": "Тайтлы",
    "new": "Новое",
    "about": "О нас",
    // Пример жанров (можешь добавить остальные)
    "action": "Экшен",
    "fantasy": "Фэнтези",
    "romance": "Романтика",
    "comedy": "Комедия"
    // ... Добавь остальные жанры и тексты при необходимости
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
    // ... Добавь остальные жанры и тексты при необходимости
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
    // ... Add more genres and texts as needed
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
  document.querySelectorAll('.lang-list a[data-lang]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage(this.getAttribute('data-lang'));
    });
  });
  // Автоматически применяем язык при загрузке страницы
  const saved = localStorage.getItem('manga_lang') || 'ru';
  setLanguage(saved);
});
