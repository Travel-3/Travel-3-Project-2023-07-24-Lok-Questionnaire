import styled from "styled-components";

const SnowOverlayContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0;
  padding: 16px;
  z-index: 10;
  pointer-events: none;
  user-select: none;
`;

const _SnowOverlay = styled.div`
  background-image: url("/images/2023/Christmas/snows.svg");
  background-repeat: repeat;
  background-size: 100%;
  width: 100%;
  height: 100%;
`;

export default function SnowOverlay() {
  return (
    <SnowOverlayContainer>
      <_SnowOverlay />
    </SnowOverlayContainer>
  );
}
