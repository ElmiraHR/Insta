import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomModal from '../../../atoms/customModal/CustomModal';
import SearchContent from '../searchContent/SearchContent';
import NotificationsContent from '../notificationContent/NotificationContent';
import s from "./SidebarMain.module.css";
import logo from "../../../assets/ICHGRA2.png";

import homeL from "../../../assets/icons/homeL.png";
import searchL from "../../../assets/icons/searchL.png";
import exploreL from "../../../assets/icons/exploreL.png";
import createL from "../../../assets/icons/createL.png";
import messegeL from "../../../assets/icons/messegeL.png";
import notifL from "../../../assets/icons/notifL.png";
import profileIcon from "../../../assets/icons/profileIcon.png";

import homeD from "../../../assets/icons/homeD.png";
import searchD from "../../../assets/icons/searchD.png";
import exploreD from "../../../assets/icons/exploreD.png";
import createD from "../../../assets/icons/createL.png";
import messegeD from "../../../assets/icons/messageD.png";
import notifD from "../../../assets/icons/notifD.png";
import profileD from "../../../assets/icons/profileIcon.png";
import CreateContent from '../createContent/createContent';

const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [activeLink, setActiveLink] = useState<string>('');  
  const [modalSize, setModalSize] = useState<'default' | 'left' | 'large' | 'small'>('default'); 

  const openModal = (type: string) => {
    setIsModalOpen(true);
    switch (type) {
      case 'search':
        setModalSize('left');
        setModalContent(<SearchContent />);
        break;
      case 'notifications':
        setModalSize('left');
        setModalContent(<NotificationsContent />);
        break;
      case 'create':
        setModalSize('large');
        setModalContent(<CreateContent />);
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
    setActiveLink(link); 
  };

  return (
    <div className={s.sidebarBox}>
      <Link to="/homePage"><img className={s.sidebarLogo} src={logo} alt="Logo" /></Link>
      <div className={s.sidebarLinks}>
        <Link to="/homePage" onClick={() => handleLinkClick('home')} className={activeLink === 'home' ? s.activeLink : ''}>
          <img src={activeLink === 'home' ? homeD : homeL} alt="Home" /> Home
        </Link>
        <a onClick={() => { openModal('search'); handleLinkClick('search'); }} className={activeLink === 'search' ? s.activeLink : ''}>
          <img src={activeLink === 'search' ? searchD : searchL} alt="Search" /> Search
        </a>
        <Link to="/explore" onClick={() => handleLinkClick('explore')} className={activeLink === 'explore' ? s.activeLink : ''}>
          <img src={activeLink === 'explore' ? exploreD : exploreL} alt="Explore" /> Explore
        </Link>
        <Link to="/messages" onClick={() => handleLinkClick('messages')} className={activeLink === 'messages' ? s.activeLink : ''}>
          <img src={activeLink === 'messages' ? messegeD : messegeL} alt="Messages" /> Messages
        </Link>
        <a onClick={() => { openModal('notifications'); handleLinkClick('notifications'); }} className={activeLink === 'notifications' ? s.activeLink : ''}>
          <img src={activeLink === 'notifications' ? notifD : notifL} alt="Notifications" /> Notifications
        </a>
        <a onClick={() => { openModal('create'); handleLinkClick('create'); }} className={activeLink === 'create' ? s.activeLink : ''}>
          <img src={activeLink === 'create' ? createD : createL} alt="Create" /> Create
        </a>
        <Link to="/profile" onClick={() => handleLinkClick('profile')} className={activeLink === 'profile' ? s.activeLink : ''}>
          <img src={activeLink === 'profile' ? profileD : profileIcon} alt="Profile" /> Profile
        </Link>
      </div>

      <CustomModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} modalSize={modalSize} />
    </div>
  );
};

export default Sidebar;
