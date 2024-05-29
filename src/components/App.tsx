import styled from "styled-components";

export const _App = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  background: #fefefe;
`;

export type AppProps = React.ComponentPropsWithoutRef<typeof _App>;
export default function App({ ...props }: AppProps) {
  return (
    <_App {...props}>
      <div className="max-w-screen-lg mx-auto relative border-black border overflow-hidden">
        {props.children}
      </div>
    </_App>
  );
}
