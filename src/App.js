import styled from "styled-components";
import Form from "./components/Form";
import Posts from "./components/Posts";
import { PostProvider, usePostContext } from "./contexts/post_context";
import AddIcon from "@material-ui/icons/Add";
import { useEffect } from "react";

const StyledApp = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  position: fixed;
  display: none !important;
  bottom: 10%;
  right: 10%;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  background-color: #04a1ff;
  color: white;
  cursor: pointer;

  &:hover,
  &:active {
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.8);
  }

  @media screen and (max-width: 500px) {
    display: ${(props) => (!props.visibility ? "block" : "none")} !important;
  }
`;

const ProvidedApp = () => {
  const { setVisibility, visibility } = usePostContext();
  useEffect(() => {
    console.log(visibility);
  }, [visibility]);
  return (
    <StyledApp>
      <Posts />
      <Form />
      <StyledAddIcon
        onClick={() => setVisibility(true)}
        fontSize="large"
        visibility={visibility}
      />
    </StyledApp>
  );
};

function App() {
  return (
    <PostProvider>
      <ProvidedApp />
    </PostProvider>
  );
}

export default App;
