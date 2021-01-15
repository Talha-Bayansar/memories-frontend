import React from "react";
import styled from "styled-components";
import { usePostContext } from "../contexts/post_context";
import Post from "./Post";

const StyledPosts = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-right: 1rem;
`;

function Posts() {
  const { posts } = usePostContext();
  return (
    <StyledPosts>
      {posts.length !== 0 ? (
        posts.map((p) => <Post key={p._id} post={p} />)
      ) : (
        <span>There are no posts available at the moment</span>
      )}
    </StyledPosts>
  );
}

export default Posts;
