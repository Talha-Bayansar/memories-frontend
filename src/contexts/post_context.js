import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PostContext = createContext();

export function PostProvider(props) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/posts`);
    const body = await response.json();
    console.log(response);
    console.log(body);
    setPosts(body);
  };

  const createPost = async (post, e) => {
    e.preventDefault();
    console.log(post);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(post),
    };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/posts`,
      fetchOptions
    );
    const body = await response.json();
    console.log(body);
    setPosts([...posts, body]);
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  const api = useMemo(() => ({ posts, setPosts, createPost }), [
    posts,
    setPosts,
    createPost,
  ]);

  return (
    <PostContext.Provider value={api}>{props.children}</PostContext.Provider>
  );
}

export const usePostContext = () => useContext(PostContext);
