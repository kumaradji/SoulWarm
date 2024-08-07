export const handleLogin = async (e, email, username, password, login, navigate, setError, setLoginAttempts) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: email || username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.user, data.user.token); // Сохраняем данные пользователя и токен в контексте
      navigate('/');
    } else {
      setError('Неверный логин или пароль');
      setLoginAttempts(prevAttempts => prevAttempts + 1); // Увеличиваем количество попыток входа
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    setError('Ошибка входа');
    setLoginAttempts(prevAttempts => prevAttempts + 1); // Увеличиваем количество попыток входа
  }
};

export const handleRegistration = async (e, password, confirmPassword, username, email, setError, setModalMessage, setIsModalOpen, setMode) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError('Пароли не совпадают');
    setIsModalOpen(true);
    setModalMessage('Пароли не совпадают');
    return;
  }

  try {
    const response = await fetch('/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setModalMessage(data.message || 'Пожалуйста, проверьте ваш email для подтверждения регистрации.');
      setIsModalOpen(true);
      setMode('login');
    } else {
      setError(data.error || JSON.stringify(data) || 'Ошибка регистрации');
      setIsModalOpen(true);
      setModalMessage(data.error || JSON.stringify(data) || 'Ошибка регистрации');
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    setError('Ошибка регистрации');
    setIsModalOpen(true);
    setModalMessage('Ошибка регистрации');
  }
};

export const handleResetPassword = async (e, email, setError, setModalMessage, setIsModalOpen, setMode) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/reset-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setModalMessage('Проверьте ваш email для инструкций по сбросу пароля.');
      setIsModalOpen(true); // Открываем модальное окно
      setMode('login');
    } else {
      setError('Ошибка при сбросе пароля');
    }
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error);
    setError('Ошибка при сбросе пароля');
  }
};
