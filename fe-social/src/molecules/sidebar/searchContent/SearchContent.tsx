// SearchContent.tsx
import React, { useState } from 'react';
import CustomInput from '../../../atoms/customInput/CustomInput';
import s from './SearchContent.module.css';
import closeIcon from "../../../assets/icons/searchL.png"

export default function SearchBarInput({ mt }: { mt: string }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearClick = () => {
    setInputValue("");
  };

  return (
    <div className="w-full relative" style={{ marginTop: mt }}>
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full bg-inputColor text-base font-light text-textGrayColor pl-4 pr-8 py-[10px] focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded-lg"
      />
      {inputValue && (
        <button className="absolute right-3 top-[12px]" onClick={handleClearClick}>
          <Image src={closeIcon} alt="close icon" />
        </button>
      )}
    </div>
  );
}