// CustomInput.tsx
import  { useState, forwardRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import s from './customInput.module.css';

interface CustomInputProps {
  className?: string;
  value: string; 
  backgroundColor?: string;
  border?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  placeholder: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  margin?: string;
  errorMessage?: string;
  showError?: boolean;
  type?: 'text' | 'password';
  clearable?: boolean;
  onClear?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Используем forwardRef с типами
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const {
    backgroundColor,
    border,
    borderColor,
    borderRadius,
    padding,
    placeholder,
    color,
    width,
    margin,
    errorMessage,
    showError,
    type = 'text',
    clearable,
    onClear,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ position: 'relative' }}>
        <input
          className={s.customInput}
          style={{
            backgroundColor: backgroundColor || 'white',
            border: border || '1px solid',
            borderColor: borderColor || '#DBDBDB',
            borderRadius: borderRadius || '10px',
            padding: padding || '12px 10px',
            color: color || '#DBDBDB',
            margin: margin || '0',
            lineHeight: 1.1,
            width: width,
          }}
          placeholder={placeholder}
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          ref={ref}
          {...rest}
        />
        {clearable && (
          <span
            onClick={onClear}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            <img
              src={"/src/assets/kr.png"}
              alt="clear"
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          </span>
        )}
        {type === 'password' && (
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? <FaEyeSlash color="#737373" /> : <FaEye color="#737373" />}
          </span>
        )}
      </div>
      {showError && <p style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</p>}
    </div>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
