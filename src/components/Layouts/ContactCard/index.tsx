import {
  CardContainer,
  ContactName,
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
  addToFavorites,
  removeFromFavorites,
}: ContactProps) => {
  const phoneNumberRegex = /^[0-9+\-().\s]+$/;

  return (
    <CardContainer>
      <ContactName>{name}</ContactName>
      <PhoneNumberContainer>
        {phoneNumbers.length > 0 ? (
          phoneNumbers.map((number, index) =>
            phoneNumberRegex.test(number) ? (
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
    </CardContainer>
  );
};

export default ContactCard;