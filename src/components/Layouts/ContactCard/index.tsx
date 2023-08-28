import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faUser,
  faStar as faSolidStar,
  faStar as faRegularStar,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { isValidPhoneNumber } from "@/utils/validations";
import {
  ActionButtons,
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
      <ContactName>
        <FontAwesomeIcon icon={faUser} />
        {` ${name}`}
      </ContactName>
      <PhoneNumberContainer>
        {phoneNumbers.length > 0 ? (
          phoneNumbers.map((number, index) =>
            isValidPhoneNumber(number) ? (
              <PhoneNumber key={index}>
                <FontAwesomeIcon icon={faPhone} />
                <a href={`tel:${number}`}>{number}</a>
              </PhoneNumber>
            ) : (
              <ErrorText key={index}>Invalid number</ErrorText>
            ),
          )
        ) : (
          <ErrorText>No phone numbers</ErrorText>
        )}
      </PhoneNumberContainer>
      <ActionButtons>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => {
            isFavorite ? removeFromFavorites(id) : addToFavorites(id);
          }}
        >
          <FontAwesomeIcon icon={isFavorite ? faSolidStar : faRegularStar} />
        </FavoriteButton>
        <DeleteButton onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </DeleteButton>
      </ActionButtons>
    </CardContainer>
  );
};

export default ContactCard;
