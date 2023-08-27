import { isValidPhoneNumber } from "@/utils/validations";
import {
  CardContainer,
  ContactName,
  DeleteButton,
  ErrorText,
  FavoriteButton,
  PhoneNumber,
  PhoneNumberContainer,
} from "./styled";
import { ContactProps } from "./types";

const ContactCard = ({
  id,
  name,
  phoneNumbers,
  isFavorite,
  onDelete,
  addToFavorites,
  removeFromFavorites,
}: ContactProps) => {
  return (
    <CardContainer>
      <ContactName>{name}</ContactName>
      <PhoneNumberContainer>
        {phoneNumbers.length > 0 ? (
          phoneNumbers.map((number, index) =>
            isValidPhoneNumber(number) ? (
              <PhoneNumber key={index}>{number}</PhoneNumber>
            ) : (
              <ErrorText key={index}>Invalid number</ErrorText>
            ),
          )
        ) : (
          <ErrorText>No phone numbers</ErrorText>
        )}
      </PhoneNumberContainer>
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={() => {
          isFavorite ? removeFromFavorites(id) : addToFavorites(id);
        }}
      >
        ★
      </FavoriteButton>
      <DeleteButton onClick={onDelete}>X</DeleteButton>
    </CardContainer>
  );
};

export default ContactCard;
