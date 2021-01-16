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
      visibility={true}
      onSubmit={(e) =>
        postToEdit === null ? createPost(newPost, e) : updatePost(newPost, e)
      }
    >
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

      <label htmlFor="url">
        File
        <input
          id="url"
          type="url"
          multiple={false}
          value={newPost.selectedFile}
          onChange={(e) =>
            setNewPost({
              ...newPost,
              selectedFile: e.target.value,
            })
          }
        />
      </label>

      <button type="submit">Submit</button>
      <button onClick={(e) => clear(e)}>Clear</button>
    </StyledForm>
  );
}

export default Form;