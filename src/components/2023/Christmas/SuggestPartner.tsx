import { AspectRatio } from "@/components/ui";
import styled from "styled-components";

const CreamBackground = styled.div`
  width: 100%;
  background-color: #f4e5bc;
  padding: 20px 0;
  position: relative;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const TopDotsPosition = styled.div`
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
`;
const BottomDotsPosition = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
`;

const PartnerContainer = styled.div`
  display: flex;
  padding-left: 12px;
  align-items: center;
`;
const PartnerInformation = styled.div`
  flex: 1;
`;
const PartnerTitle = styled.div``;
const PartnerDescription = styled.div`
  font-weight: 700;
`;

const PartnerPicture = styled.div`
  /* width: 36vw; */
  width: 46.2%;
  margin-right: -10%;
  /* transform: translateX(); */
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export type SuggestPartnerProps = { src: string; description: string };

export default function SuggestPartner({
  src,
  description,
}: SuggestPartnerProps) {
  return (
    <CreamBackground>
      <TopDotsPosition>
        <AspectRatio ratio={2048 / 47}>
          <Image
            src={`/images/2023/Christmas/dots.png`}
            alt={`Dots`}
            loading="eager"
            // fill
            // unoptimized
          />
        </AspectRatio>
      </TopDotsPosition>
      <PartnerContainer>
        <PartnerInformation>
          <PartnerTitle>
            <AspectRatio ratio={661 / 122}>
              <Image
                src={`/images/2023/Christmas/your-good-partner.png`}
                alt={`Your Good Partner`}
                loading="eager"
              />
            </AspectRatio>
          </PartnerTitle>
          <PartnerDescription>{description}</PartnerDescription>
        </PartnerInformation>
        <PartnerPicture>
          <AspectRatio ratio={497 / 547}>
            <Image src={src} alt={`Your Good Partner`} loading="eager" />
          </AspectRatio>
        </PartnerPicture>
      </PartnerContainer>
      <BottomDotsPosition>
        <AspectRatio ratio={2048 / 47}>
          <Image
            src={`/images/2023/Christmas/dots.png`}
            alt={`Dots`}
            loading="eager"
          />
        </AspectRatio>
      </BottomDotsPosition>
    </CreamBackground>
  );
}
