import { useEffect, useState } from "react";
import { $api } from "../../api/api";

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

export const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await $api.get("/post/all");
      setPosts(res.data);
    };
    getPosts();
  }, []);

  return (
    <div style={styles.pageContainer}>
      
      <main style={styles.content}>
        <div style={styles.gallery}>
          {posts.map((item: Post, index) => (
            <div
              key={item._id}
              style={
                (Math.floor(index / 3) % 2 === 0 && index % 3=== 4) ||
                (Math.floor(index / 3) % 2 === 1 && index % 3 === 0)
                  ? { ...styles.postContainer, ...styles.largePost }
                  : styles.postContainer
              }
            >
              <img src={item.image_url} alt={item.caption || "Post image"} style={styles.image} />
            </div>
          ))}
        </div>
      </main>
      
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
  } as React.CSSProperties,
  sidebar: {
    width: "256px",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#f8f9fa",
    padding: "20px",
    boxSizing: "border-box",
  } as React.CSSProperties,
  content: {
    marginLeft: "256px", // Отступ для сайдбара
    paddingBottom: "178px", // Отступ для футера
    padding: "20px",
    width: "calc(100% - 256px)", // Основной контент занимает оставшееся пространство
    boxSizing: "border-box",
  } as React.CSSProperties,
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  } as React.CSSProperties,
  postContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  largePost: {
    gridColumn: "span 2",
    gridRow: "span 2",
  } as React.CSSProperties,
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  } as React.CSSProperties,
  footer: {
    position: "fixed",
    left: "256px", // Отступ для сайдбара
    bottom: 0,
    width: "calc(100% - 256px)", // Футер занимает пространство справа от сайдбара
    height: "178px",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "10px",
    boxSizing: "border-box",
  } as React.CSSProperties,
};

export default Explore;
