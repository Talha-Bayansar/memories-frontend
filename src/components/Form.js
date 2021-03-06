import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePostContext } from "../contexts/post_context";
import CloseIcon from "@material-ui/icons/Close";
import FileBase from "react-file-base64";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  height: fit-content;
  width: 300px;
  padding: 1rem;

  #filebase > input {
    border: none;
    padding-left: 0;
  }

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

  @media screen and (max-width: 500px) {
    position: fixed;
    top: 0;
    display: ${(props) => (props.visibility ? "flex" : "none")};
    width: 100vw;
    height: 100vh;
    max-width: unset;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem 3rem;
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
    selectedFile: "",
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

      <label id="filebase" htmlFor="file">
        File
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setNewPost({ ...newPost, selectedFile: base64 })
          }
          capture
        />
      </label>

      <button type="submit">Submit</button>
      <button onClick={(e) => clear(e)}>Clear</button>
    </StyledForm>
  );
}

export default Form;
