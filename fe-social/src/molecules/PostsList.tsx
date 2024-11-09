// import { useEffect, useState } from "react";
// import { $api } from "../api/api";
// import styles from "./Posts.module.css";
// import { parseData } from "../helpers/parseData";

// type Post = {
//   _id: string;
//   user_id: string;
//   image_url: string;
//   caption: string;
//   likes_count: number;
//   comments_count: number;
//   created_at: string;
//   __v: number;
// };

// export const PostsList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const getPosts = () => {
//       $api.get("/post/all").then((res) => setPosts(res.data));
//     };
//     const getFollowers = () => {
//       $api.get(`/follow/672c78f0b6361b9bb37beca9/followers`);
//     };
//     getFollowers();
//     getPosts();
//   }, []);

//   return (
//     <ul className={styles.postList}>
//       {posts.length > 0 ? (
//         posts.map((item: Post) => (
//           <PostItem key={item._id} item={item} isFollow={true} />
//         ))
//       ) : (
//         <li>No Posts</li>
//       )}
//     </ul>
//   );
// };

// type ItemProps = {
//   item: {
//     caption: string;
//     created_at: string;
//     image_url: string;
//     profile_image: string;
//     user_name: string;
//     user_id: string;
//     likes_count: number;
//   };
//   isFollow: boolean;
// };

// const PostItem = ({ item, isFollow }: ItemProps) => {
//   const [userName, setUsername] = useState("");
//   // const isFollow = [id1, id2, id3].find(it => it === item.user_id) ? true : false
//   // useEffect(() => {
//   //   const response = $api.get('/')
//   // },[])

//   return (
//     <li className={styles.postItem}>
//       <div>
//         <img src={item.profile_image} alt="avatar" />
//         <span>{item.user_name}</span>
//         <span className={styles.created}>
//           &#8226;{parseData(item.created_at)}&#8226;
//         </span>
//         <FollowButton
//           isFollow={isFollow}
//           userId={item.user_id} // To-Do
//           targetUserId={item.user_id}
//         />
//       </div>
//       <img src={item.image_url} alt="" />
//       {item.caption}
//     </li>
//   );
// };

// interface FollowButtonProps {
//   isFollow: boolean;
//   userId: string;
//   targetUserId: string;
// }

// function FollowButton({ isFollow, userId, targetUserId }: FollowButtonProps) {
//   const handleFollow = () => {
//     if (!isFollow) {
//       $api.post(`/follow/${userId}/follow/${targetUserId}`);
//     } else {
//       $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
//     }
//   };

//   return (
//     <button onClick={handleFollow}>{isFollow ? "follow" : "unfollow"}</button>
//   );
// }

// export default PostsList;

// PostsList.tsx


// PostsList.tsx
import { useEffect, useState } from "react";
import { $api } from "../api/api";
import CustomModal from "../atoms/customModal/CustomModal";
import styles from "./Posts.module.css"; // Подключаем модульные стили
import smiles from "../assets/smiles"; // Импортируем массив смайликов
import PostModalContent from "../atoms/postModalContent/PostModalContent";
import CustomInput from "../atoms/customInput/CustomInput";

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
    setNewCommentText(newCommentText + " "); // добавим emoji URL в комментарий
    setIsEmojiPickerOpen(false);
  };

  return (
    <div>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post._id} className={styles.postItem}>
            <img
              src={post.image_url}
              alt=""
              onClick={() => openModal(post)}
              className={styles.postImage}
            />
          </li>
        ))}
      </ul>

      {selectedPost && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          content={<PostModalContent postImageUrl={selectedPost.image_url}
          comments={comments}
          newCommentText={newCommentText}
          setNewCommentText={setNewCommentText}
          handleAddComment={handleAddComment}
          toggleEmojiPicker={toggleEmojiPicker}
          isEmojiPickerOpen={isEmojiPickerOpen}
          addEmoji={addEmoji}/>}
          modalSize="large"
        >
        
        </CustomModal>
      )}
    </div>
  );
};

export default PostsList;
