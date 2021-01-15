import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePostContext } from "../contexts/post_context";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 30%;
  height: fit-content;
  max-width: 300px;
  padding: 1rem;

  & > label {
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;

    & > input {
      padding: 5px 5px;
      border-radius: 5px;
      border: 1px solid grey;

      &:focus {
        border: 1px solid lightblue;
        outline: none;
      }
    }

    & > #file {
      border: none;
      padding: unset;
    }
  }

  & > button {
    margin: 0.5rem 0;
    padding: 0.25rem;
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
  const { createPost, posts } = usePostContext();

  useEffect(() => {
    setNewPost({
      title: "",
      message: "",
      creator: "",
      tags: "",
      selectedFile: "",
    });
  }, [posts]);

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
      </label>

      <label htmlFor="message">
        Message
        <input
          id="message"
          type="text"
          value={newPost.message}
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
        />
      </label>

      <label htmlFor="creator">
        Creator
        <input
          id="creator"
          type="text"
          value={newPost.creator}
          onChange={(e) => setNewPost({ ...newPost, creator: e.target.value })}
        />
      </label>

      <label htmlFor="tags">
        Tags
        <input
          id="tags"
          type="text"
          value={newPost.tags}
          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
        />
      </label>

      <label htmlFor="file">
        File
        <input
          id="file"
          type="file"
          value={newPost.selectedFile}
          onChange={(e) =>
            setNewPost({ ...newPost, selectedFile: e.target.value })
          }
        />
      </label>

      <button type="submit" onClick={() => createPost(newPost)}>
        Create
      </button>
    </StyledForm>
  );
}

export default Form;
