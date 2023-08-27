import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import ContactCard from "@/components/Layouts/ContactCard";
import PaginationControls from "@/components/Generals/PaginationControls";
import Loading from "@/components/Generals/Loading";
import SearchInput from "@/components/Generals/Search";
import usePagination from "@/hooks/usePagination";
import useFavorite from "@/hooks/useFavorite";
import { GET_CONTACT } from "@/queries/contactQueries";

import { Contact } from "./types";
import { PhoneBookContainer } from "./styled";
import CreateContactForm from "../CreateContactForm";

const ITEMS_PER_PAGE = 10;

const PhoneBookList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentPage, setCurrentPage, setTotalCount } = usePagination({
    initialPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    initialTotalCount: 0,
  });
  const { favorites, addToFavorites, removeFromFavorites } = useFavorite();

  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{
    contact: Contact[];
    contact_aggregate: {
      aggregate: {
        count: number;
      };
    };
  }>(GET_CONTACT, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      searchTerm: `%${searchTerm}%`,
    },
  });

  const totalCount = data?.contact_aggregate.aggregate.count || 0;

  useEffect(() => {
    if (data) {
      setTotalCount(totalCount);
    }
  }, [data, setTotalCount, totalCount]);

  if (isLoading) return <Loading />;

  if (error || !data) {
    console.error(error);
    return <h2>Something went wrong!</h2>;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const contacts = data.contact || [];

  return (
    <PhoneBookContainer>
      <CreateContactForm />
      <SearchInput
        value={searchTerm}
        onSearch={setSearchTerm}
        isLoading={isLoading}
        placeholder="Search contacts by firstname or lastname..."
      />
      {contacts.map((contact) => {
        const isFavorite = favorites.includes(contact.id);
        const phoneNumbers = contact.phones.map((phone) => phone.number);
        return (
          <ContactCard
            id={contact.id}
            key={contact.id}
            name={`${contact.first_name} ${contact.last_name}`}
            phoneNumbers={phoneNumbers}
            isFavorite={isFavorite}
            addToFavorites={() => addToFavorites(contact.id)}
            removeFromFavorites={() => removeFromFavorites(contact.id)}
          />
        );
      })}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </PhoneBookContainer>
  );
};

export default PhoneBookList;
