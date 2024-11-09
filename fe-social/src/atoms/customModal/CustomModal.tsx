// CustomModal.tsx
import React from 'react';
import Modal from 'react-modal';
import './CustomModal.css';

Modal.setAppElement('#root');

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  modalSize: 'default' | 'left' | 'large' | 'small';  // Пропс для выбора типа модалки
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, content, modalSize }) => {
  const getModalClass = () => {
    switch (modalSize) {
      case 'large':
        return 'ModalLarge';  // Используем класс для большой модалки
      case 'small':
        return 'ModalSmall';  // Используем класс для маленькой модалки
      default:
        return 'ModalLeft';  // Используем класс для левой модалки
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className={getModalClass()}  // Устанавливаем нужный класс
      overlayClassName="Overlay"
    >
      <button className="modalCloseButton" onClick={onClose}>×</button>
      <div className="ModalContent">
        {content}
      </div>
    </Modal>
  );
};

export default CustomModal;
