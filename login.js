document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('authForm');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const messageEl = document.getElementById('message');

// Отримати користувачів з localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}
// Зберегти користувачів у localStorage
function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

registerBtn.addEventListener('click', () => {
  const username = form.username.value.trim();
  const password = form.password.value.trim();

  if (!username || !password) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Будь ласка, введіть логін і пароль для реєстрації.';
    return;
  }

  let users = getUsers();

  if (users[username]) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Цей логін вже існує. Спробуйте інший.';
    return;
  }

  users[username] = password;
  setUsers(users);

  messageEl.style.color = 'green';
  messageEl.textContent = 'Реєстрація пройшла успішно! Тепер можете увійти.';
  form.reset();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const username = form.username.value.trim();
  const password = form.password.value.trim();

  let users = getUsers();

  if (users[username] && users[username] === password) {
    messageEl.style.color = 'green';
    messageEl.textContent = 'Вхід успішний!';

    localStorage.setItem('currentUser', username);

    // Тут можна зробити редірект
    // window.location.href = 'dashboard.html';
  } else {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Неправильний логін або пароль.';
  }
});
