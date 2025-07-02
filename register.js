document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  const loginInput = document.getElementById('regLogin');
  const pass1Input = document.getElementById('regPassword');
  const pass2Input = document.getElementById('regPassword2');
  const message = document.getElementById('register-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const login = loginInput.value.trim();
    const pass1 = pass1Input.value;
    const pass2 = pass2Input.value;

    if (!login || !pass1 || !pass2) {
      message.textContent = 'Заполните все поля!';
      return;
    }
    if (pass1 !== pass2) {
      message.textContent = 'Пароли не совпадают!';
      return;
    }
    if (localStorage.getItem('user_' + login)) {
      message.textContent = 'Такой логин уже существует!';
      return;
    }

    // Сохраняем пользователя (для примера — пароль не хэшируется, для настоящего сайта это небезопасно!)
    localStorage.setItem('user_' + login, JSON.stringify({
      username: login,
      password: pass1,
      email: '',
      about: '',
      avatar: '',
      stats: {favorites:0, comments:0, history:0}
    }));
    localStorage.setItem('current_user', login);
    message.style.color = "#00ff77";
    message.textContent = 'Аккаунт создан! Перенаправление...';
    setTimeout(() => { window.location.href = "profile.html"; }, 1100);
  });
});