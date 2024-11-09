import React, { CSSProperties } from 'react';
import s from './customButtonSubmit.module.css';

interface CustomButtonSubmitProps {
  width: string;
  fontSize: number | string;
  backgroundColor?: string;
  border?: string;
  borderRadius: string;
  padding?: string;
  text?: string;
  type?: 'submit' | 'button' | 'reset';
  color?: string;
  disabled?: boolean;
  customStyle?: CSSProperties;
  onClick: () => void; // Теперь без типа MouseEventHandler
}

const CustomButtonSubmit: React.FC<CustomButtonSubmitProps> = ({
  backgroundColor,
  border,
  padding,
  text = "Submit",
  type = "submit", 
  color,
  disabled, 
  customStyle = {}, 
  onClick, 
}) => {
  const buttonClasses = disabled ? `${s.button} ${s.disabled}` : s.button;

  return (
    <button
      type={type} 
      onClick={onClick} // просто вызывает функцию без передачи события
      className={buttonClasses} 
      disabled={disabled} 
      style={{
        backgroundColor: disabled ? backgroundColor : backgroundColor || "#0095F6", 
        border: border || "none",
        padding: padding || "16px 30px",
        color: color || "white",
        lineHeight: 1.1,
        cursor: disabled ? "not-allowed" : "pointer", 
        ...customStyle, 
      }}
    >
      {text} 
    </button>
  );
};

export default CustomButtonSubmit;
