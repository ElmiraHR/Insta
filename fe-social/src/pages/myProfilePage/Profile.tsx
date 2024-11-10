import React, { useState, useEffect, ChangeEvent } from 'react';
import s from './Profile.module.css';
import PostsList from '../../molecules/PostsList';

interface Post {
  id: string;
  image: string;
  caption: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDataFromLocalStorage = () => {
      setLoading(true);
      try {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newProfileImage) {
      setUserData(prevData => prevData ? { ...prevData, profile_image: newProfileImage } : null);
    }
    setIsEditing(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className={s.profileContainer}>
      {isEditing ? (
        <div className={s.editProfile}>
          <h2>Edit Profile</h2>
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={userData.full_name}
            onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
          />
          <textarea
            placeholder="Bio"
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={s.imageUpload}
          />
          {newProfileImage && <img src={newProfileImage} alt="New Profile" className={s.previewImage} />}
          <button onClick={handleSaveClick} className={s.saveButton}>Save</button>
        </div>
      ) : (
        <div>
          <div className={s.header}>
            <img
              src={userData.profile_image || 'https://res.cloudinary.com/dtbzos500/image/upload/v1731097780/iqhbfm0nzqrmnz5nwcfc.jpg'}
              alt="Profile"
              className={s.profileImage}
            />
            <div className={s.info}>
              <h2 className={s.username}>{userData.username || userData.full_name}</h2>
              <button className={s.editButton} onClick={handleEditClick}>Edit profile</button>
              <div className={s.stats}>
                <span>{userData.posts_count} posts</span>
                <span>{userData.followers_count} followers</span>
                <span>{userData.following_count} following</span>
              </div>
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
      )}
    </div>
  );
};