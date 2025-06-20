// lang.js — Google Translate с сохранением выбора языка пользователя

// 1. Функция смены языка через Google Translate
function changeLanguage(lang) {
  var select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
    localStorage.setItem('site_lang', lang); // Сохраняем выбранный язык
  }
}

// 2. Скрываем стандартный виджет Google Translate и вешаем обработчики
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем скрытый div для Google Translate
  var el = document.getElementById('google_translate_element');
  if (!el) {
    el = document.createElement('div');
    el.id = 'google_translate_element';
    el.style.display = 'none';
    document.body.appendChild(el);
  }

  // Обработчики клика по языковым ссылкам
  var langLinks = document.querySelectorAll('.lang-list a[data-lang]');
  langLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var lang = this.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });

  // Автоустановка сохранённого языка после загрузки страницы
  setTimeout(function() {
    var savedLang = localStorage.getItem('site_lang');
    if (savedLang) changeLanguage(savedLang);
  }, 1500); // Ждём, пока Google Translate подгрузится
});
