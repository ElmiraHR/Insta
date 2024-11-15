import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import followRoutes from './routes/followRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js'; // Измените путь, если нужно

// Настройка Cloudinary
cloudinary.config({
    cloud_name: 'dtbzos500',
    api_key: '572587314587646',
    api_secret: 'mxigCvQ1-x2xV1sp6Rhui6EShuw'
})

// Инициализация приложения Express
const app = express();

// Middleware для обработки CORS
app.use(cors());

// Middleware для обработки JSON
app.use(express.json());

// Подключение swagger
//app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/notifications', notificationRoutes);

app.post('/api/comment/:postId/:userId', (req, res) => {
    const { postId, userId } = req.params;
    const { comment_text } = req.body;
    
    // Здесь логика для обработки добавления комментария в базу данных
    res.status(200).json({ message: 'Комментарий добавлен' });
  });
  
// Экспорт приложения для использования в server.js
export default app;