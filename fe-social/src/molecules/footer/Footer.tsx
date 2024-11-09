// Footer.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import CustomModal from '../../atoms/customModal/CustomModal'
import SearchContent from '../sidebar/searchContent/SearchContent';
import NotificationsContent from '../sidebar/notificationContent/NotificationContent';

type NavLink = {
  label: string;
  path: string;
};

interface FooterProps {
  navLinks: NavLink[];
}

const Footer: React.FC<FooterProps> = ({ navLinks }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [activeLink, setActiveLink] = useState<string>('');  // Состояние для отслеживания активного пункта меню

  const openModal = (type: string) => {
    setIsModalOpen(true);
    switch (type) {
      case 'search':
        setModalContent(<SearchContent/>);
        break;
      case 'notifications':
        setModalContent(<NotificationsContent/>);
        break;
      default:
        setModalContent(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);  // Устанавливаем активную ссылку
  }; 

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBox}>
        <div className={styles.footerLinks}>
          <Link to="/home" onClick={() => {
            openModal('search');
            handleLinkClick('search');
          }}>Home</Link>
          <Link to="/search" onClick={() => {
            openModal('search');
            handleLinkClick('search');
          }}>Search</Link>
          <Link to="/explore" onClick={() => {
            openModal('search');
            handleLinkClick('search');
          }}>Explore</Link>
          <Link to="/messages" onClick={() => {
            openModal('messages');
            handleLinkClick('messages');
          }}>Messages</Link>
          <Link to="/notification" onClick={() => {
            openModal('notification');
            handleLinkClick('notification');
          }}>Notificaitions</Link>
          <Link to="/create" onClick={() => {
            openModal('create');
            handleLinkClick('create');
          }}>Create</Link>
        </div>
      <div className={styles.copyRight}>
       © 2024 ICHgram
      </div>
      <CustomModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      </div>
    </footer>
  );
};

export default Footer;
