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
      order_by: { created_at: desc }
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

export const ADD_CONTACT = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

export const GET_ALL_CONTACT_NAMES = gql`
  query GetAllContactNames {
    contact {
      id
      first_name
      last_name
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;
