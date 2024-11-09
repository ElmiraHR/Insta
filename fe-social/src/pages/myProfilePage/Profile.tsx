import React, { useState, useEffect } from 'react';
import s from './Profile.module.css';
import PostsList from '../../molecules/PostsList';

// Интерфейс для постов
interface Post {
  id: string;
  image: string;
  caption: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

// Интерфейс для данных пользователя
interface UserData {
  username: string;
  full_name: string;
  profile_image: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
  bio: string;
  posts: Post[];
}

export const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null); // Данные пользователя
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Статус загрузки
  const [error, setError] = useState<string | null>(null); // Статус ошибки

  useEffect(() => {
    const fetchUserDataFromLocalStorage = () => {
      setLoading(true);
      try {
        // Извлекаем данные из локального хранилища
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData)); // Парсим и сохраняем данные пользователя
        } else {
          setError("No user data available in local storage");
        }
      } catch (err) {
        console.error("Error loading user data from localStorage:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataFromLocalStorage();
  }, []);

  const openModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Пока данные загружаются
  }

  if (error) {
    return <div>{error}</div>; // Если произошла ошибка
  }

  if (!userData) {
    return <div>No user data available</div>; // Если данные пользователя отсутствуют
  }

  return (
    <div className={s.profileContainer}>
      <div className={s.header}>
        <img
          src={userData.profile_image || 'https://res.cloudinary.com/dtbzos500/image/upload/v1731097780/iqhbfm0nzqrmnz5nwcfc.jpg'}
          alt="Profile"
          className={s.profileImage}
        />
        <div className={s.info}>
          <h2 className={s.username}>{userData.username || userData.full_name}</h2>
          <button className={s.editButton}>Edit profile</button>
          <div className={s.stats}>
            <span>{userData.posts_count} posts</span>
            <span>{userData.followers_count} followers</span>
            <span>{userData.following_count} following</span></div>
          <div> <p>{userData.bio}</p></div> 
          
          <p className={s.bio}>{userData.bio}</p>
        </div>
      </div>
      <PostsList posts={userData.posts || []} openModal={openModal} />
      {selectedPost && (
        <div className={`${s.modal} ${s.large}`}>
          <div className={s.modalContent}>
            <button className={s.closeButton} onClick={closeModal}>
              ×
            </button>
            <img src={selectedPost.image} alt="Selected Post" className={s.largeImage} />
          </div>
        </div>
      )}
    </div>
  );
};
