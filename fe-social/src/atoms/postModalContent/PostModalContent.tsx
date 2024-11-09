import React, { useState } from "react";
import { Comment } from "../types"; // Импортируем типы для комментариев
import smiles from "../../assets/smiles"; // Импортируем смайлики
import s from "./PostModalContent.module.css";
import axios from 'axios';

type PostModalContentProps = {
  postId: string; // Добавлен postId
  userId: string; // Добавлен userId
  postImageUrl: string;
  comments: Comment[];
  newCommentText: string;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  handleAddComment: () => void;
  toggleEmojiPicker: () => void;
  isEmojiPickerOpen: boolean;
  addEmoji: (emojiUrl: string) => void;
};

const PostModalContent: React.FC<PostModalContentProps> = ({
  postId,
  userId,
  postImageUrl,
  comments,
  newCommentText,
  setNewCommentText,
  toggleEmojiPicker,
  isEmojiPickerOpen,
  addEmoji,
}) => {
  const handleAddComment = async () => {
    if (!newCommentText.trim()) return; // Проверка на пустой комментарий
 console.log(postId, userId); // Печатает значения, чтобы проверить их
          if (!postId || !userId) {
            console.error('postId or userId is missing');
            return;
          }
    try {
      // Запрос на добавление комментария
      await axios.post(`/api/comment/${postId}/${userId}`, {
        comment_text: newCommentText,
      });

      // Очистка поля ввода
      setNewCommentText('');

      // Можно обновить список комментариев, если нужно
      // Например, сделайте запрос для получения обновленного списка комментариев
    } catch (error) {
      console.error('Error adding comment:', error);
      // Обработка ошибок, можно уведомить пользователя
    }
  };

  return (
    <div className={s.boxModalFull} style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <img src={postImageUrl} alt="Post" width={400} height={565} />
      </div>
      <div className={s.modalBoxComment}>
        <div style={{ marginBottom: "20px", height: "70vh", overflowY: "scroll" }}>
          {comments.map((comment) => (
            <div key={comment._id} style={{ marginBottom: "10px" }}>
              <p>{comment.comment_text}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>❤️</span>
                <span>💬</span>
              </div>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={toggleEmojiPicker}>😊</button>
          {isEmojiPickerOpen && (
            <div>
              {smiles.map((emojiUrl, index) => (
                <img
                  key={index}
                  src={emojiUrl}
                  alt="emoji"
                  style={{ width: "25px", cursor: "pointer", margin: "0 5px" }}
                  onClick={() => addEmoji(emojiUrl)}
                />
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="Add a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            style={{ marginTop: "10px", padding: "10px", width: "100%" }}
          />
         
          
          <button onClick={handleAddComment} style={{ marginTop: "10px" }}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModalContent;
