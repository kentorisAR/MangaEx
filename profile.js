document.addEventListener('DOMContentLoaded', function () {
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarInput = document.getElementById('avatarInput');
  const profileUsername = document.getElementById('profileUsername');
  const profileLogin = document.getElementById('profileLogin');
  const profileEmail = document.getElementById('profileEmail');
  const profileAbout = document.getElementById('profileAbout');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const logoutProfileBtn = document.getElementById('logoutProfileBtn');
  const statFavorites = document.getElementById('stat-favorites');
  const statComments = document.getElementById('stat-comments');
  const statHistory = document.getElementById('stat-history');

  let currentLogin = localStorage.getItem('current_user');
  if (!currentLogin) {
    alert('Вы не авторизованы! Сначала войдите.');
    window.location.href = "index.html";
    return;
  }
  let userData = localStorage.getItem('user_' + currentLogin);
  if (!userData) {
    alert('Пользователь не найден!');
    window.location.href = "index.html";
    return;
  }
  userData = JSON.parse(userData);

  function fillProfile() {
    profileUsername.textContent = userData.username || currentLogin;
    profileLogin.value = userData.username || currentLogin;
    profileEmail.value = userData.email || "";
    profileAbout.value = userData.about || "";

    // Если есть кастомный аватар, показываем его, иначе — empty_profile.png (без папки)
    if (userData.avatar && userData.avatar.length > 10) {
      avatarPreview.src = userData.avatar;
    } else {
      avatarPreview.src = "empty_profile.png";
    }

    statFavorites.textContent = userData.stats?.favorites || 0;
    statComments.textContent = userData.stats?.comments || 0;
    statHistory.textContent = userData.stats?.history || 0;
  }
  fillProfile();

  avatarInput.addEventListener('change', function () {
    const file = avatarInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      avatarPreview.src = e.target.result;
      userData.avatar = e.target.result;
      saveUser();
    };
    reader.readAsDataURL(file);
  });

  saveProfileBtn.addEventListener('click', function () {
    const newUsername = profileLogin.value.trim();
    const newEmail = profileEmail.value.trim();
    const newAbout = profileAbout.value.trim();

    if (!newUsername) {
      alert("Логин не может быть пустым!");
      return;
    }
    if (newUsername !== currentLogin) {
      if (localStorage.getItem('user_' + newUsername)) {
        alert("Такой логин уже существует!");
        return;
      }
      localStorage.setItem('user_' + newUsername, JSON.stringify({
        ...userData,
        username: newUsername,
        email: newEmail,
        about: newAbout
      }));
      localStorage.removeItem('user_' + currentLogin);
      localStorage.setItem('current_user', newUsername);
      currentLogin = newUsername;
      userData.username = newUsername;
    } else {
      userData.username = newUsername;
      userData.email = newEmail;
      userData.about = newAbout;
      saveUser();
    }
    alert("Профиль обновлён!");
    fillProfile();
  });

  logoutProfileBtn.addEventListener('click', function () {
    localStorage.removeItem('current_user');
    window.location.href = "index.html";
  });

  function saveUser() {
    localStorage.setItem('user_' + currentLogin, JSON.stringify(userData));
  }
});
