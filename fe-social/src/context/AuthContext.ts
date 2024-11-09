// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Определение типа данных контекста
// interface AuthContextType {
//   user: string | null;
//   isAuthenticated: boolean;
//   login: (email: string) => void;
//   logout: () => void;
// }

// // Создание контекста с пустыми значениями по умолчанию
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Провайдер для оборачивания компонента с доступом к контексту
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<string | null>(null);

//   // Функция для входа
//   const login = (email: string) => {
//     setUser(email); // Пример: хранить email пользователя в state
//   };

//   // Функция для выхода
//   const logout = () => {
//     setUser(null);
//   };

//   // Определяем, аутентифицирован ли пользователь
//   const isAuthenticated = user !== null;

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Хук для использования контекста
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
