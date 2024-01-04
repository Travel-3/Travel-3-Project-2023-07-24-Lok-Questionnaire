import styled from "styled-components";

export const App = styled.div`
  height: 100vh;
  //   max-height: -webkit-fill-available;
  max-height: fit-content;
  -ms-overflow-style: none;
  scrollbar-width: none;
  max-width: 768px;
  /* &::-webkit-scrollbar: {
    display: none;
  } */
  position: relative;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
`;

export type AppProps = React.ComponentPropsWithoutRef<typeof App>;
export default App;
