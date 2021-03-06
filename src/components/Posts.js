import React from "react";
import styled from "styled-components";
import { usePostContext } from "../contexts/post_context";
import Post from "./Post";

const StyledPosts = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-right: 1rem;

  @media screen and (max-width: 500px) {
    margin: unset;
  }
`;

function Posts() {
  const { posts, message } = usePostContext();
  return (
    <StyledPosts>
      {posts.length !== 0 ? (
        posts.map((p) => <Post key={p._id} post={p} />)
      ) : (
        <span>{message}</span>
      )}
    </StyledPosts>
  );
}

export default Posts;
