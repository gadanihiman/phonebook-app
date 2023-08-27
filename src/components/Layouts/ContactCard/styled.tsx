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
    justify-content: space-between;
  }
`;

export const ContactName = styled.span`
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  svg {
    margin-right: 8px;
  }

  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

export const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PhoneNumber = styled.span`
  color: #333;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    margin-right: 8px;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorText = styled.span`
  color: #ff4d4f;
  background-color: #fff2f0;
  padding: 2px 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 0.9em;
`;

export const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: ${(props) => (props.isFavorite ? "#FFD700" : "#ccc")};
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  font-size: 1.2rem;
`;

export const DeleteButton = styled.button`
  background: #ff4500;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 25px;
  border-top: 1px solid #ccc;
  padding-top: 16px;
  width: 100%;
  justify-content: flex-end;

  @media (min-width: 768px) {
    margin-top: 0px;
    border-top: none;
    padding-top: 0px;
    width: auto;
    justify-content: flex-start;
  }
`;
