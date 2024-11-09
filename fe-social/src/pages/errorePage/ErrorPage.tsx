import { useEffect, useState } from "react";
import { $api } from "../../api/api";
import styles from "./ErrorPage.module.css";
import { parseData } from "../../helpers/parseData";
import { matchUserId } from "../../helpers/matchUsersId";

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

export const Error = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    // Получаем данные текущего пользователя из локального хранилища
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUserId = userData._id;

    const getPosts = () => {
      $api.get("/post/all").then((res) => {
        // Фильтруем посты, исключая посты текущего пользователя
        const filteredPosts = res.data.filter(
          (post: Post) => post.user_id !== currentUserId
        );
        setPosts(filteredPosts);
      });
    };

    const getFollowers = async () => {
      const response = await $api.get(
        `/follow/${currentUserId}/following`
      );
      setFollows(response.data);
    };

    getFollowers();
    getPosts();
  }, []);

  return (
    <ul className={styles.postList}>
      {posts.length > 0 ? (
        posts.map((item: Post) => (
          <PostItem
            key={item._id}
            item={item}
            isFollow={matchUserId(follows, item.user_id)}
          />
        ))
      ) : (
        <li>No Posts</li>
      )}
    </ul>
  );
};

type ItemProps = {
  item: {
    caption: string;
    created_at: string;
    image_url: string;
    profile_image: string;
    user_name: string;
    user_id: string;
    likes_count: number;
  };
  isFollow: boolean;
};

const PostItem = ({ item, isFollow }: ItemProps) => {
  return (
    <li className={styles.postItem}>
      <div>
        <img src={item.profile_image} alt="avatar" />
        <span>{item.user_name}</span>
        <span className={styles.created}>
          &#8226;{parseData(item.created_at)}&#8226;
        </span>
        <FollowButton
          isFollow={isFollow}
          userId={item.user_id}
          targetUserId={item.user_id}
        />
      </div>
      <img src={item.image_url} alt="" />
      {item.caption}
    </li>
  );
};

interface FollowButtonProps {
  isFollow: boolean;
  userId: string;
  targetUserId: string;
}

function FollowButton({ isFollow, userId, targetUserId }: FollowButtonProps) {
  const [follow, setFollow] = useState(isFollow);

  const handleFollow = () => {
    if (!follow) {
      $api.post(`/follow/${userId}/follow/${targetUserId}`);
      setFollow(true);
    } else {
      $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
      setFollow(false);
    }
  };

  return (
    <button onClick={handleFollow}>{!follow ? "follow" : "unfollow"}</button>
  );
}

export default Error;
