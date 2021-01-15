import React from "react";
import styled from "styled-components";

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  padding: 1rem;
  align-items: center;
  background-color: #e6e4e4;
  margin: 1rem;
  border-radius: 10px;
`;

function Post(props) {
  const { post } = props;
  return (
    <StyledPost>
      <img src={post.file} alt={post.title} />
      <div className="post_data">
        <h3 className="post_title">{post.title}</h3>
        <span className="post_creator">{post.creator}</span>
        <p className="post_message">{post.message}</p>
        <span className="post_tags">{post.tags}</span>
      </div>
    </StyledPost>
  );
}

export default Post;
