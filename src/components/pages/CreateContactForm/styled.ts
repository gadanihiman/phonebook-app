import styled from "@emotion/styled";

export const ContactFormContainer = styled.div`
  padding: 8px;

  // larger screens
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 20px 0 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    border: 1px solid #007bff;
  }
`;

export const SubmitButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const ErrorLabel = styled.span`
  color: red;
  font-size: 12px;
  width: 100%;
`;

export const SuccessAlert = styled.div`
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

export const AlertContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ErrorAlert = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;
