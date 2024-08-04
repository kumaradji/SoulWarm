import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Profile.module.scss';
import Modal from '../../components/Modal/Modal.jsx';

const Profile = () => {
  const { user, setIsLoggedIn, fetchUserData } = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        await fetchUserData();

        if (user) {
          try {
            const avatarResponse = await fetch('/api/profile/avatar/', {
              headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
              }
            });

            if (avatarResponse.ok) {
              const data = await avatarResponse.json();
              setAvatarUrl(`http://localhost${data.avatar}`);
            } else {
              console.error('Error fetching avatar:', avatarResponse.statusText);
            }
          } catch (error) {
            console.error('Error fetching avatar:', error);
            setAvatarUrl(null);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, [fetchUserData, user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const handleMasterclassAccess = (masterclass) => {
    if (user.groups.includes('VIP')) {
      navigate(`/masterclass`);
    } else {
      setModalMessage('Доступ к этому мастер-классу закрыт. Пожалуйста, оплатите для доступа.');
      setIsModalOpen(true);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);

      try {
        const response = await fetch('/api/profile/avatar/', {
          method: 'PUT',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (response.ok) {
          alert('Аватар успешно загружен.');
        } else {
          alert('Ошибка при загрузке аватара.');
        }
      } catch (error) {
        alert('Ошибка при загрузке аватара.');
        console.error('Error uploading avatar:', error);
      }
    }
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.cardProfile}>
        <h3>Профиль</h3>
        <div className={styles.profileInfo}>
          {avatarUrl && <img src={avatarUrl} alt="User" className={styles.userIcon} />}
          <div className={styles.userInfo}>
            <p className={styles.userName}><strong>Имя пользователя:</strong> {user.username}</p>
            <br />
            <p className={styles.userName}><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
          id="avatarUpload"
        />
        <div className={styles.textAvatarAdd}>чтобы загрузить или изменить аватар</div>
        <div className={styles.textAvatarAddBlock}>
          <label htmlFor="avatarUpload" className={styles.customFileUpload}>
            Выберите файл
          </label>
          <div className={styles.profile__addButton} onClick={handleAvatarUpload}>
            Загрузить аватар
          </div>
          <Link to="/change-password" className={styles.profile__link}>Изменить пароль</Link>
          <div onClick={handleLogout} className={styles.profile__logoutButton}>
            Выйти
          </div>
        </div>
      </div>

      <div className={styles.cardMasterClasses}>
        <h3>Доступные мастер-классы</h3>
        {user.groups.includes('VIP') ? (
          <ul>
            <li onClick={() => handleMasterclassAccess('marena-garden')}>
              <button className={styles.masterclass}>Цветной фон</button>
            </li>
          </ul>
        ) : (
          <p>Нет доступных мастер-классов</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default Profile;
