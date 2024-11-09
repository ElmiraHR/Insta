import express from 'express';
import { register, login, checkUser, updatePassword } from '../controllers/authController.js';

const router = express.Router();

// Регистрация нового пользователя
router.post('/register', register);

// Вход пользователя
router.post('/login', login);

// Проверка пользователя по email для сброса пароля
router.post('/check-user', checkUser);

// Обновление пароля
router.post('/update-password', updatePassword);

export default router;