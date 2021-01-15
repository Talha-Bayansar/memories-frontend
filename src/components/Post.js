import React, { useState } from "react";
import styled from "styled-components";

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  background-color: #e6e4e4;
  margin: 1rem;
  border-radius: 10px;

  & > .post_img {
    position: relative;
    background: url(${(props) => props.url}) center no-repeat;
    background-size: 100%;
    width: 100%;
    height: 50%;
    border-radius: 10px 10px 0 0;

    & > .post_img_data {
      position: absolute;
      margin: 1rem;
      display: flex;
      flex-direction: column;
      color: white;
      font-weight: bold;

      & > .post_creator {
        text-transform: capitalize;
        margin-bottom: 0.5rem;
      }

      & > .post_date {
        font-size: 0.75rem;
      }
    }

    &::before {
      content: "";
      position: absolute;
      background-color: rgba(0, 0, 0, 0.3);
      height: 100%;
      width: 100%;
      border-radius: 10px 10px 0 0;
    }

    &::after {
      content: ${(props) => props};
    }
  }

  & > .post_data {
    height: 50%;
    padding: 0.5rem 1rem;

    & > .post_title {
      text-transform: capitalize;
    }

    & > .post_creator {
    }

    & > .post_message {
    }

    & > .post_tags {
      color: grey;
      font-size: 0.75rem;
    }
  }
`;

function Post(props) {
  const { post } = props;
  return (
    <StyledPost url={post.selectedFile}>
      <div className="post_img">
        <div className="post_img_data">
          <span className="post_creator">{post.creator}</span>
          <span className="post_date">date</span>
        </div>
      </div>
      <div className="post_data">
        <span className="post_tags">{post.tags}</span>
        <h3 className="post_title">{post.title}</h3>
        <p className="post_message">{post.message}</p>
      </div>
    </StyledPost>
  );
}

export default Post;
