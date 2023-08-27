import styled from "@emotion/styled";

const BaseCard = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 16px;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    padding: 24px;
  }

  &:hover {
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

export default BaseCard;
