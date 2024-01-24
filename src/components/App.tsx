import styled from "styled-components";

export const App = styled.div`
  /* max-height: fit-content;
  height: 100dvh; */
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  background: #eee;
`;

export type AppProps = React.ComponentPropsWithoutRef<typeof App>;
export default App;
