import { useState, Dispatch, SetStateAction, useEffect } from "react";

interface UsePaginationProps {
  initialPage: number;
  itemsPerPage: number;
  initialTotalCount: number;
}

interface UsePaginationReturn {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
}

const usePagination = ({
  initialPage,
  itemsPerPage,
  initialTotalCount,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {}, [totalCount]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalCount,
  };
};

export default usePagination;
