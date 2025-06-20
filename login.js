document.addEventListener('DOMContentLoaded', function () {
  // Кнопка открытия модалки
  const authBtn = document.querySelector('.auth-btn');
  // Модалка и элементы
  const modal = document.getElementById('loginModal');
  const closeBtn = document.getElementById('closeLoginModal');

  // Открыть модалку
  authBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.add('active');
  });

  // Закрыть по крестику
  closeBtn.addEventListener('click', function () {
    modal.classList.remove('active');
  });

  // Закрыть по клику вне окна
  window.addEventListener('mousedown', function (e) {
    if (modal.classList.contains('active') && e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Пример обработки логина (убрать, если логика другая)
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Здесь добавить свою логику авторизации
    alert('Вход выполнен (заглушка)');
    modal.classList.remove('active');
  });
});
