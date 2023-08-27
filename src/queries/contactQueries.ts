import { gql } from "@apollo/client";

export const GET_CONTACT = gql`
  query ContactsQuery($limit: Int!, $offset: Int!, $searchTerm: String) {
    contact(
      limit: $limit
      offset: $offset
      where: {
        _or: [
          { first_name: { _ilike: $searchTerm } }
          { last_name: { _ilike: $searchTerm } }
        ]
      }
    ) {
      id
      first_name
      last_name
      phones {
        contact_id
        number
      }
    }
    contact_aggregate(
      where: {
        _or: [
          { first_name: { _ilike: $searchTerm } }
          { last_name: { _ilike: $searchTerm } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
