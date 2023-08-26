import styled from "@emotion/styled";

const BaseCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 12px;
  margin: 8px 0;

  // larger screens
  @media (min-width: 768px) {
    padding: 16px;
  }
`;

export default BaseCard;
