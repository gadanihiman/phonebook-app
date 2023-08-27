export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  phones: { contact_id: string; number: string }[];
}
