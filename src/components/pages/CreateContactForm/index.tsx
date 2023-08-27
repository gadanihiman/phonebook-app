import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import {
  FormContainer,
  InputField,
  SubmitButton,
  ErrorLabel,
  SuccessAlert,
  ErrorAlert,
  AlertContainer,
  ContactFormContainer,
} from "./styled";
import {
  ADD_CONTACT,
  GET_ALL_CONTACT_NAMES,
  GET_CONTACT,
} from "@/queries/contactQueries";
import Loading from "@/components/Generals/Loading";
import { isValidName, isValidPhoneNumber } from "@/utils/validations";

const ITEMS_PER_PAGE = 10;
const currentPage = 1;
const searchTerm = "";

const CreateContactForm = () => {
  const { data: allContactsData } = useQuery<{
    contact: { first_name: string; last_name: string }[];
  }>(GET_ALL_CONTACT_NAMES);
  const [addContact, { loading }] = useMutation(ADD_CONTACT, {
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
  const existingContactNames = useMemo(() => {
    return (
      allContactsData?.contact.map((c) => `${c.first_name} ${c.last_name}`) ||
      []
    );
  }, [allContactsData]);

  const isNameUnique = (firstName: string, lastName: string): boolean => {
    const fullName = `${firstName} ${lastName}`;
    return !existingContactNames.includes(fullName);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [validationError, setValidationError] = useState("");
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateContact = async () => {
    setValidationError("");
    setSuccess(false);
    try {
      if (!firstName || !lastName) {
        setValidationError("First name and last name are required.");
        return;
      }
      if (phoneNumbers.some((num) => !isValidPhoneNumber(num))) {
        setValidationError("Invalid phone number.");
        return;
      }
      const isUnique = isNameUnique(firstName, lastName);
      if (isValidName(firstName + lastName) && isUnique) {
        await addContact({
          variables: {
            first_name: firstName,
            last_name: lastName,
            phones: phoneNumbers.map((num) => ({ number: num })),
          },
        });
        setSuccess(true);
        setMutationError(null);
      } else {
        setValidationError(
          "Name should be unique and shouldn't contain special characters.",
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setMutationError(error.message);
      } else {
        setMutationError("An unknown error occurred.");
      }
    }
  };

  return (
    <ContactFormContainer>
      <FormContainer>
        <InputField
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Phone Numbers (comma separated)"
          value={phoneNumbers.join(", ")}
          onChange={(e) => setPhoneNumbers(e.target.value.split(", "))}
        />
        <SubmitButton onClick={handleCreateContact}>Create</SubmitButton>
        {loading && <Loading />}
      </FormContainer>
      <AlertContainer>
        {success && <SuccessAlert>Contact successfully added!</SuccessAlert>}
        {validationError && <ErrorLabel>{validationError}</ErrorLabel>}
        {mutationError && <ErrorAlert>{mutationError}</ErrorAlert>}
      </AlertContainer>
    </ContactFormContainer>
  );
};

export default CreateContactForm;
