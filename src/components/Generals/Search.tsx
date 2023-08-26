import React, { FC, ChangeEvent, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const Search = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

interface SearchComponentProps {
  onSearch: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  value: string;
}

const SearchComponent: FC<SearchComponentProps> = ({
  value,
  onSearch,
  isLoading,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Search
      ref={inputRef}
      type="text"
      placeholder={placeholder || "Search contacts..."}
      onChange={handleSearch}
      value={value}
    />
  );
};

export default SearchComponent;
