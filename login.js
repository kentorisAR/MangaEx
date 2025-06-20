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
  const profileLink = document.getElementById('profileLink');
  const loginButton = document.getElementById('loginButton');

  // Показывать "Профиль" если уже вошли
  if (localStorage.getItem('current_user')) {
    if (profileLink) profileLink.style.display = '';
    if (loginButton) loginButton.style.display = 'none';
  }

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

  // Регистрация (LocalStorage)
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

  // Вход по логину или email
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const loginOrEmail = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Поиск по логину
    let user = localStorage.getItem('user_' + loginOrEmail);
    let userObj = null;

    // Если по логину не найден, ищем по email
    if (!user) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
          const u = JSON.parse(localStorage.getItem(key));
          if (u.email && u.email.toLowerCase() === loginOrEmail.toLowerCase()) {
            user = localStorage.getItem(key);
            break;
          }
        }
      }
    }

    if (!user) {
      alert('Пользователь не найден!');
      return;
    }

    userObj = JSON.parse(user);
    if(userObj.password !== password){
      alert('Неверный пароль!');
      return;
    }
    alert('Вход выполнен! Добро пожаловать, ' + userObj.username);
    modal.classList.remove('active');
    localStorage.setItem('current_user', userObj.username);
    if (profileLink) profileLink.style.display = '';
    if (loginButton) loginButton.style.display = 'none';
    // Можно добавить переход: window.location.href = "profile.html";
  });
});
