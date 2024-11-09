import Sidebar from "../../molecules/sidebar/sidebarHome/SidebarMain";
import s from "./HomePage.module.css";
import Footer from "../../molecules/footer/Footer";
import { ImageForm } from "../../molecules/ImageForm";
import PostsList from "../../molecules/PostsList";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен из localStorage
    localStorage.removeItem("user"); 
    navigate("/signin"); // Перенаправление на страницу входа
  };

  return (
    <>
      <Sidebar />
      <div className={s.homePage}>
        {/* Кнопка выхода из аккаунта */}
        <button onClick={handleLogout} className={s.logoutButton}>Logout</button>
        {/* Контейнер для прокрутки постов */}
        <div className={s.postsContainer}>
          <span>File Uploader</span>
          <ImageForm />
          <span>Posts</span>
          <PostsList />
        </div>
      </div>

      <Footer
        navLinks={[
          { label: "Home", path: "/homePage" },
          { label: "Search", path: "/search" },
          { label: "Explore", path: "/explore" },
          { label: "Messages", path: "/messages" },
          { label: "Notification", path: "/notification" },
          { label: "Create", path: "/create" },
        ]}
      />
    </>
  );
};
