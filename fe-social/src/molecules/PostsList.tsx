// PostsList.tsx
import { useEffect, useState } from "react";
import { $api } from "../api/api";
import CustomModal from "../atoms/customModal/CustomModal";
import styles from "./Posts.module.css";
import PostModalContent from "../atoms/postModalContent/PostModalContent";

export type Post = {
  _id: string;
  user_id: string;
  image_url: string;
  caption: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  __v: number;
};

export type Comment = {
  _id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
};

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  useEffect(() => {
    // Получаем все посты
    $api.get("/post/all").then((res) => setPosts(res.data));
  }, []);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    // Загружаем комментарии для выбранного поста
    $api.get(`/comments/${post._id}`).then((res) => setComments(res.data));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleAddComment = () => {
    if (newCommentText.trim()) {
      const newComment = {
        post_id: selectedPost?._id,
        user_id: "672c78f0b6361b9bb37beca9", // Замените на текущий user_id
        comment_text: newCommentText,
        created_at: new Date().toISOString(),
      };
      // Добавляем комментарий в БД
      $api.post("/comments", newComment).then(() => {
        setComments([...comments, newComment]);
        setNewCommentText("");
      });
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const addEmoji = (emojiUrl: string) => {
    setNewCommentText(newCommentText + emojiUrl); // добавим emoji URL в комментарий
    setIsEmojiPickerOpen(false);
  };

  return (
    <div>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post._id} className={styles.postItem} onClick={() => openModal(post)}>
            <img src={post.image_url} alt="Post" className={styles.postImage} />
            <p>{post.caption}</p>
          </li>
        ))}
      </ul>

      {selectedPost && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          content={
            <PostModalContent
              postId={selectedPost._id}
              userId="672c78f0b6361b9bb37beca9" // Замените на текущий user_id
              postImageUrl={selectedPost.image_url}
              comments={comments}
              newCommentText={newCommentText}
              setNewCommentText={setNewCommentText}
              handleAddComment={handleAddComment}
              toggleEmojiPicker={toggleEmojiPicker}
              isEmojiPickerOpen={isEmojiPickerOpen}
              addEmoji={addEmoji}
            />
          }
          modalSize="large"
        />
      )}
    </div>
  );
};

export default PostsList;
