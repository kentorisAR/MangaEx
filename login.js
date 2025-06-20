document.addEventListener('DOMContentLoaded', function () {
  const authBtn = document.querySelector('.auth-btn');
  const modal = document.getElementById('loginModal');
  const closeBtn = document.getElementById('closeLoginModal');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showLoginTab = document.getElementById('showLoginTab');
  const showRegisterTab = document.getElementById('showRegisterTab');
  const switchToRegister = document.getElementById('switchToRegister');
  const switchToLogin = document.getElementById('switchToLogin');

  // Открыть модалку
  authBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.add('active');
    showLogin();
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

  // Переключение между формами
  function showLogin() {
    loginForm.style.display = '';
    registerForm.style.display = 'none';
    showLoginTab.classList.add('active');
    showRegisterTab.classList.remove('active');
    switchToRegister.style.display = '';
    switchToLogin.style.display = 'none';
  }
  function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = '';
    showLoginTab.classList.remove('active');
    showRegisterTab.classList.add('active');
    switchToRegister.style.display = 'none';
    switchToLogin.style.display = '';
  }
  showLoginTab.addEventListener('click', showLogin);
  showRegisterTab.addEventListener('click', showRegister);
  switchToRegister.addEventListener('click', function(e){e.preventDefault(); showRegister();});
  switchToLogin.addEventListener('click', function(e){e.preventDefault(); showLogin();});

  // Простая локальная регистрация (LocalStorage)
  registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const password2 = document.getElementById('registerPassword2').value;
    if(password !== password2){
      alert('Пароли не совпадают!');
      return;
    }
    if(localStorage.getItem('user_' + username)){
      alert('Такой логин уже существует!');
      return;
    }
    localStorage.setItem('user_' + username, JSON.stringify({
      username, email, password
    }));
    alert('Профиль успешно зарегистрирован! Теперь войдите.');
    showLogin();
  });

  // Простая локальная авторизация (LocalStorage)
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const user = localStorage.getItem('user_' + username);
    if(!user){
      alert('Пользователь не найден!');
      return;
    }
    const userObj = JSON.parse(user);
    if(userObj.password !== password){
      alert('Неверный пароль!');
      return;
    }
    alert('Вход выполнен! Добро пожаловать, ' + userObj.username);
    modal.classList.remove('active');
    // Здесь можно добавить сохранение "сессии" или обновление UI
  });
});
