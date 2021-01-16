import styled from "styled-components";
import Form from "./components/Form";
import Posts from "./components/Posts";
import { PostProvider } from "./contexts/post_context";

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

const ProvidedApp = () => {
  return (
    <StyledApp>
      <Posts />
      <Form />
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
