import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePostContext } from "../contexts/post_context";
import CloseIcon from "@material-ui/icons/Close";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  height: fit-content;
  width: 300px;
  padding: 1rem;

  & > label {
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;

    & > input,
    & > textarea {
      padding: 8px 5px;
      border-radius: 5px;
      border: 1px solid grey;
      font-size: 0.9rem;

      &:focus {
        border: 1px solid lightblue;
        outline: none;
      }
    }

    & > textarea {
      height: 5rem;
    }

    & > #file {
      border: none;
      padding: unset;
    }
  }

  & > button {
    margin: 0.5rem 0;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: #d9d9d9;
    }
  }

  .file {
    border: none;
    padding-left: unset;
    padding-right: unset;
  }

  @media screen and (max-width: 500px) {
    position: fixed;
    top: 0;
    display: ${(props) => (props.visibility ? "flex" : "none")};
    width: 100vw;
    height: 100vh;
    max-width: unset;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 7rem;
    color: white;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  display: none !important;
  color: #db0000;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    display: block !important;
    position: absolute;
    bottom: 10%;
    right: 10%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.8);

    &:hover,
    &:active {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

function Form() {
  const [newPost, setNewPost] = useState({
    title: "",
    message: "",
    creator: "",
    tags: "",
    file: "",
  });
  const {
    createPost,
    posts,
    postToEdit,
    setPostToEdit,
    updatePost,
    visibility,
    setVisibility,
  } = usePostContext();

  const clear = (e) => {
    e.preventDefault();
    setPostToEdit(null);
    setNewPost({
      title: "",
      message: "",
      creator: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    setNewPost({
      title: "",
      message: "",
      creator: "",
      tags: "",
      selectedFile: "",
    });
  }, [posts]);

  useEffect(() => {
    if (postToEdit !== null) setNewPost(postToEdit);
    console.log(postToEdit);
  }, [postToEdit]);

  const phone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );

  return (
    <StyledForm
      visibility={visibility}
      onSubmit={(e) => {
        postToEdit === null ? createPost(newPost, e) : updatePost(newPost, e);
        setVisibility(false);
      }}
    >
      <StyledCloseIcon fontSize="large" onClick={() => setVisibility(false)} />
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          value={newPost.title}
          required
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
      </label>

      <label htmlFor="message">
        Message
        <textarea
          id="message"
          type="text"
          value={newPost.message}
          required
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
        />
      </label>

      <label htmlFor="creator">
        Creator
        <input
          id="creator"
          type="text"
          value={newPost.creator}
          required
          onChange={(e) => setNewPost({ ...newPost, creator: e.target.value })}
        />
      </label>

      <label htmlFor="tags">
        Tags
        <input
          id="tags"
          type="text"
          value={newPost.tags}
          required
          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
        />
      </label>

      <label htmlFor="url">
        File
        {!phone ? (
          <input
            id="url"
            type="url"
            multiple={false}
            value={newPost.selectedFile}
            required
            onChange={(e) =>
              setNewPost({
                ...newPost,
                selectedFile: e.target.value,
              })
            }
          />
        ) : (
          <input
            className="file"
            type="file"
            value={newPost.selectedFile}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                selectedFile: window.URL.createObjectURL(e.target.files[0]),
              });
            }}
            accept="image/*"
            capture
          />
        )}
      </label>

      <button type="submit">Submit</button>
      <button onClick={(e) => clear(e)}>Clear</button>
    </StyledForm>
  );
}

export default Form;
