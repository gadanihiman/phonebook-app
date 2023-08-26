import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query ContactsQuery {
    contact {
      first_name
      last_name
      phones {
        contact_id
        number
      }
    }
  }
`;

export default function Countries() {
  const { data, loading, error } = useQuery<{
    contact: {
      first_name: string;
      last_name: string;
      phones: {
        contact_id: string;
        number: string;
      }[];
    }[];
  }>(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!data || error) {
    console.error(error);
    return null;
  }

  const contacts = data && data.contact && data.contact || [];

  return (
    <div>
      {contacts.map((country: {
        first_name: string;
        last_name: string;
        phones: {
          contact_id: string;
          number: string;
        }[];
      }) => (
        <div key={country.first_name}>
          <p>
            {country.first_name} {country.last_name}
          </p>
        </div>
      ))}
    </div>
  );
}
