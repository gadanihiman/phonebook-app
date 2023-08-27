import BaseCard from "@/components/Generals/BaseCard";
import styled from "@emotion/styled";

export const CardContainer = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ContactName = styled.span`
  font-weight: bold;
  margin-bottom: 8px;

  // larger screens
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

export const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PhoneNumber = styled.span`
  color: #333;
  margin-bottom: 4px;
`;

export const ErrorText = styled.span`
  color: #ff4d4f;
  background-color: #fff2f0;
  padding: 2px 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 0.9em;
`;

export const FavoriteButton = styled.button<{
  isFavorite: boolean;
}>`
  background: ${(props) => (props.isFavorite ? "yellow" : "grey")};
  border: none;
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  border-radius: 50%;
`;

export const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: darkred;
  }
`;
