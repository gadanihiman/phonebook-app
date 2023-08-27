import styled from "@emotion/styled";

export const SearchWrapper = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 10px 20px;
  flex: 1;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Loader = styled.div`
  margin-left: 10px;
`;

export const SearchIcon = styled.i`
  margin-right: 8px;
  color: #007bff;
`;
