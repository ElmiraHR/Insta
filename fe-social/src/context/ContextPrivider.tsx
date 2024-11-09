// src/context/ContextProvider.tsx
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(null);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
