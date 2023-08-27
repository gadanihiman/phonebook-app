import { SetStateAction, Dispatch } from "react";
import styled from "@emotion/styled";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  font-size: 1rem;
  margin: 0 10px;
`;

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <PaginationContainer>
      <PaginationButton
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </PaginationButton>
      <PaginationInfo>
        {currentPage} / {totalPages}
      </PaginationInfo>
      <PaginationButton
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default PaginationControls;
