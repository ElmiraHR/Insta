// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import app from './app.js';
// import { Server } from 'socket.io';
// import { messageSocketHandler, authenticateSocket } from './routes/messageRoutes.js';

// dotenv.config();
// connectDB();

// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });

// // Инициализация WebSocket сервера
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Разрешить подключения с любого источника
//   },
// });

// // Middleware для WebSocket-аутентификации
// io.use((socket, next) => {
//   authenticateSocket(socket, next); // Проверка JWT токена
// });

// // Обработка WebSocket-соединений
// io.on('connection', (socket) => {
//   console.log('Новое WebSocket соединение');

//   // Подключаем обработчики сообщений
//   messageSocketHandler(socket, io);
// });

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import { Server } from 'socket.io';
import { messageSocketHandler, authenticateSocket } from './routes/messageRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Добавляем импорт маршрутов аутентификации

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// Добавляем маршруты аутентификации
app.use(express.json()); // для обработки JSON в теле запроса
app.use('/api/auth', authRoutes); // подключаем маршруты для аутентификации

// Запуск сервера Express
const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Инициализация WebSocket сервера с использованием того же server, что и для Express
const io = new Server(server, {
  cors: {
    origin: '*', // Разрешить подключения с любого источника
  },
});

// Middleware для WebSocket-аутентификации
io.use((socket, next) => {
  authenticateSocket(socket, next); // Проверка JWT токена
});

// Обработка WebSocket-соединений
io.on('connection', (socket) => {
  console.log('Новое WebSocket соединение');

  // Подключаем обработчики сообщений
  messageSocketHandler(socket, io);
});
