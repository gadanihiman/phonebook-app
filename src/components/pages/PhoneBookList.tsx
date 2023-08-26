import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";

import usePagination from "@/hooks/usePagination";
import ContactCard from "@/components/Layouts/ContactCard";
import PaginationControls from "@/components/Generals/PaginationControls";
import Loading from "@/components/Generals/Loading";

const ITEMS_PER_PAGE = 10;

const QUERY = gql`
  query ContactsQuery($limit: Int!, $offset: Int!) {
    contact(limit: $limit, offset: $offset) {
      first_name
      last_name
      phones {
        contact_id
        number
      }
    }
    contact_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const PhoneBookContainer = styled.div`
  padding: 16px;

  // larger screens
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const PhoneBookList = () => {
  const { currentPage, setCurrentPage, setTotalCount } = usePagination({
    initialPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    initialTotalCount: 0,
  });

  const { data, loading, error } = useQuery<{
    contact: {
      id: string;
      first_name: string;
      last_name: string;
      phones: {
        contact_id: string;
        number: string;
      }[];
    }[];
    contact_aggregate: {
      aggregate: {
        count: number;
      };
    };
  }>(QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    },
  });

  const totalCount = data?.contact_aggregate.aggregate.count || 0;

  useEffect(() => {
    if (data) {
      setTotalCount(totalCount);
    }
  }, [data, setTotalCount, totalCount]);

  if (loading) return <Loading />;

  if (error || !data) {
    console.error(error);
    return <h2>Something went wrong!</h2>;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const contacts = data.contact || [];

  return (
    <PhoneBookContainer>
      {contacts.map((contact) => {
        const phoneNumbers = contact.phones.map((phone) => phone.number);
        return (
          <ContactCard
            key={contact.id}
            name={`${contact.first_name} ${contact.last_name}`}
            phoneNumbers={phoneNumbers}
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
