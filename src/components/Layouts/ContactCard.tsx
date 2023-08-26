import styled from "@emotion/styled";

import BaseCard from "@/components/Generals/BaseCard";

interface ContactProps {
  name: string;
  phoneNumbers: string[];
}

const CardContainer = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  // larger screens
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const ContactName = styled.span`
  font-weight: bold;
  margin-bottom: 8px;

  // larger screens
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhoneNumber = styled.span`
  color: #333;
  margin-bottom: 4px;
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  background-color: #fff2f0;
  padding: 2px 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 0.9em;
`;

const ContactCard = ({ name, phoneNumbers }: ContactProps) => {
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
    </CardContainer>
  );
};

export default ContactCard;
