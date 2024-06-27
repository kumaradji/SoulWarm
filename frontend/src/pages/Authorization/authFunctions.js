export const handleLogin = async (e, email, username, password, login, navigate, setError, setLoginAttempts) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8000/api/login/', {
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
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, first_name: '', last_name: '' }), // Добавьте first_name и last_name, если они обязательны
    });

    if (response.ok) {
      setModalMessage('Пожалуйста, проверьте ваш email для подтверждения регистрации.');
      setIsModalOpen(true); // Открываем модальное окно
      setMode('login');
    } else {
      const errorData = await response.json();
      console.error('Ошибка регистрации:', errorData);
      setError(errorData.username ? errorData.username[0] : 'Ошибка регистрации');
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    setError('Ошибка регистрации');
  }
};

export const handleResetPassword = async (e, email, setError, setModalMessage, setIsModalOpen, setMode) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8000/api/reset-password/', {
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
