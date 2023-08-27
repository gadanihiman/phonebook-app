import React, { ChangeEvent, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Loader, SearchIcon, SearchInput, SearchWrapper } from "./styled";

interface SearchProps {
  onSearch: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  value: string;
}

const Search = ({ value, onSearch, isLoading, placeholder }: SearchProps) => {
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
    <SearchWrapper>
      <SearchIcon>
        <FontAwesomeIcon icon={faSearch} />
      </SearchIcon>
      <SearchInput
        ref={inputRef}
        type="text"
        placeholder={placeholder || "Search contacts..."}
        onChange={handleSearch}
        value={value}
      />
      {isLoading && <Loader>Loading...</Loader>}
      {/* <Loader>Loading...</Loader> */}
    </SearchWrapper>
  );
};

export default Search;
