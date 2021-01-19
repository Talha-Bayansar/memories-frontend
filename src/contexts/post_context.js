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
  const [postToEdit, setPostToEdit] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState();

  const getPosts = async () => {
    setMessage("Loading...");
    const response = await fetch(`${process.env.REACT_APP_URL}/posts`);
    const body = await response.json();
    console.log(response);
    console.log(body);
    setPosts(body);
    if (body.length <= 0)
      setMessage("There are no posts available at the moment.");
  };

  const createPost = async (post, e) => {
    e.preventDefault();
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  const deletePost = async (post) => {
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/posts/${post._id}`,
      fetchOptions
    );
    const body = await response.json();
    console.log(body);
    setPosts(body);
  };

  const updatePost = async (post, e) => {
    e.preventDefault();
    console.log("update");
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(post),
    };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/posts/${post._id}`,
      fetchOptions
    );
    const body = await response.json();
    console.log(post);
    setPosts(body);
    setPostToEdit(null);
  };

  const like = async (post) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Conntent-type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/posts/like/${post._id}`,
      fetchOptions
    );
    const body = await response.json();
    setPosts(body);
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  const api = useMemo(
    () => ({
      posts,
      setPosts,
      postToEdit,
      setPostToEdit,
      createPost,
      updatePost,
      deletePost,
      like,
      visibility,
      setVisibility,
      message,
      setMessage,
    }),
    [
      posts,
      setPosts,
      postToEdit,
      setPostToEdit,
      createPost,
      updatePost,
      deletePost,
      like,
      visibility,
      setVisibility,
      message,
      setMessage,
    ]
  );

  return (
    <PostContext.Provider value={api}>{props.children}</PostContext.Provider>
  );
}

export const usePostContext = () => useContext(PostContext);
