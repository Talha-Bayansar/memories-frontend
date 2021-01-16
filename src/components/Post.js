import React, { useState } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import { usePostContext } from "../contexts/post_context";

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 350px;
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

    & > .post_dots {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      top: 0;
      right: 0;
      margin: 1rem;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }

      & > .post_dot {
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: white;
        margin: 1px;
      }
    }
  }

  & > .post_data {
    display: flex;
    flex-direction: column;
    height: 50%;
    padding: 0.5rem 1rem;

    & > .post_title {
      text-transform: capitalize;
      margin: 0.75rem 0;
    }

    & > .post_message {
      overflow: scroll;
      font-size: 0.75rem;
      /* height: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center; */
    }

    & > .post_tags {
      color: grey;
      font-size: 0.75rem;
    }
  }
  & > .post_buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    & > .post_button {
      cursor: pointer;
      display: flex;
      align-items: center;
      border: none;
      background-color: unset;
      font-size: 0.9rem;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 10px;
      padding: 3px 6px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    & > .like {
      color: #04a1ff;
    }

    & > .delete {
      color: #db0000;
    }
  }
`;

function Post(props) {
  const { post } = props;
  const { deletePost, setPostToEdit, like } = usePostContext();
  return (
    <StyledPost url={post.selectedFile}>
      <div className="post_img">
        <div className="post_img_data">
          <span className="post_creator">{post.creator}</span>
          <span className="post_date">date</span>
        </div>
        <div onClick={() => setPostToEdit(post)} className="post_dots">
          <div className="post_dot"></div>
          <div className="post_dot"></div>
          <div className="post_dot"></div>
        </div>
      </div>
      <div className="post_data">
        <span className="post_tags">{post.tags}</span>
        <h3 className="post_title">{post.title}</h3>
        <p className="post_message">{post.message}</p>
      </div>
      <div className="post_buttons">
        <button onClick={() => like(post)} className="like post_button">
          <ThumbUpAltIcon /> Like {post.likeCount}
        </button>
        <button onClick={() => deletePost(post)} className="delete post_button">
          <DeleteIcon /> Delete
        </button>
      </div>
    </StyledPost>
  );
}

export default Post;
