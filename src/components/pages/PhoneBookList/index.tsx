import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import ContactCard from "@/components/Layouts/ContactCard";
import PaginationControls from "@/components/Generals/PaginationControls";
import Loading from "@/components/Generals/Loading";
import SearchInput from "@/components/Generals/Search";
import usePagination from "@/hooks/usePagination";
import useFavorite from "@/hooks/useFavorite";
import { DELETE_CONTACT, GET_CONTACT } from "@/queries/contactQueries";

import { Contact } from "./types";
import {
  ContactListContainer,
  Divider,
  ErrorSnackBar,
  PhoneBookContainer,
} from "./styled";
import CreateContactForm from "../CreateContactForm";
import SubTitle from "@/components/Generals/SubTitle";

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

  const [deleteContact, { loading: isDeleting, error: deleteError }] =
    useMutation(DELETE_CONTACT);

  const totalCount = data?.contact_aggregate.aggregate.count || 0;

  useEffect(() => {
    if (data) {
      setTotalCount(totalCount);
    }
  }, [data, setTotalCount, totalCount]);

  if (error || (!data && !isLoading)) {
    console.error(error);
    return <h2>Something went wrong!</h2>;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const contacts = data?.contact || [];

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact({
        variables: { id },
        refetchQueries: [
          {
            query: GET_CONTACT,
            variables: {
              limit: ITEMS_PER_PAGE,
              offset: (currentPage - 1) * ITEMS_PER_PAGE,
              searchTerm: `%${searchTerm}%`,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <PhoneBookContainer>
      <Divider />
      <CreateContactForm />
      <Divider />
      <SubTitle>Contacts</SubTitle>
      <SearchInput
        value={searchTerm}
        onSearch={setSearchTerm}
        isLoading={isLoading}
        placeholder="Search contacts by firstname or lastname..."
      />
      {deleteError && <ErrorSnackBar>{deleteError?.message}</ErrorSnackBar>}
      {(isLoading || isDeleting) && <Loading />}
      <ContactListContainer>
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
              onDelete={() => handleDeleteContact(contact.id)}
            />
          );
        })}
      </ContactListContainer>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </PhoneBookContainer>
  );
};

export default PhoneBookList;
