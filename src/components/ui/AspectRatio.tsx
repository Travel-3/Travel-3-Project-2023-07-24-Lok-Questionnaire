import styled from "styled-components";

type AspectRatioProps = {
  ratio: number;
  children: React.ReactNode;
};

const AspectRatioContainer = styled.div<AspectRatioProps>`
  position: relative;
  /* width: 100%; */
  overflow: hidden;
  height: 0;
  padding-bottom: ${(props) => 100 / props.ratio}%;
`;

const AspectRatioContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function AspectRatio({ children, ratio }: AspectRatioProps) {
  return (
    <AspectRatioContainer ratio={ratio}>
      <AspectRatioContent>{children}</AspectRatioContent>
    </AspectRatioContainer>
  );
}
