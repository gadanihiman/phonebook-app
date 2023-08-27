import styled from "@emotion/styled";

export const PhoneBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ContactListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const ErrorSnackBar = styled.div`
  background-color: #f44336;
  color: white;
  padding: 14px 20px;
  margin: 20px 0;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  margin: 16px 0;
`;
