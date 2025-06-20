// login.js — обработка клика по кнопке "Вход / Регистрация" и показ модального окна

document.addEventListener('DOMContentLoaded', function() {
  // Находим кнопку входа
  const authBtn = document.querySelector('.auth-btn');

  // Создаём модальное окно, если его нет
  let modal = document.getElementById('auth-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '2';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.zIndex = '10000';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.innerHTML = `
      <div style="background:#23233a;padding:30px 24px 20px 24px;border-radius:14px;max-width:320px;width:90%;margin:auto;box-shadow:0 8px 40px #00f0ff66;position:relative;">
        <button id="close-auth-modal" style="position:absolute;top:10px;right:14px;font-size:1.5rem;background:none;border:none;color:#aaa;cursor:pointer;">×</button>
        <h2 style="margin-top:0;color:#00f0ff;text-align:center;">Вход или регистрация</h2>
        <form id="login-form">
          <input type="text" placeholder="Логин или email" required style="width:100%;margin-bottom:12px;padding:7px 10px;border-radius:6px;border:1px solid #333;background:#1a1a2a;color:#fff;">
          <input type="password" placeholder="Пароль" required style="width:100%;margin-bottom:12px;padding:7px 10px;border-radius:6px;border:1px solid #333;background:#1a1a2a;color:#fff;">
          <button type="submit" style="width:100%;background:#00f0ff;color:#23233a;font-weight:bold;border:none;padding:9px 0;border-radius:6px;font-size:1rem;cursor:pointer;box-shadow:0 2px 8px #00f0ff22;">Войти</button>
        </form>
        <div style="margin-top:10px;text-align:center;">
          <a href="#" id="register-link" style="color:#ff00ff;text-decoration:underline;cursor:pointer;">Нет аккаунта? Зарегистрируйтесь</a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Показать модалку при клике на кнопку
  authBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  });

  // Закрытие модалки по кнопке "×" или клику вне окна
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.id === 'close-auth-modal') {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 150);
    }
  });

  // Обработка формы входа (без сервера — только пример)
  modal.querySelector('#login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Сюда вставь свою обработку логина через сервер
    alert('Вход выполнен (пример).');
    modal.style.display = 'none';
  });

  // Ссылка "Зарегистрируйтесь" (можно показать другую форму)
  modal.querySelector('#register-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Показать форму регистрации (пример)');
    // Здесь можешь добавить переключение на форму регистрации
  });
});
