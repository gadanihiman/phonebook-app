export const isValidName = (name: string) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};

export const isValidPhoneNumber = (number: string) => {
  const regex = /^[0-9+\-().\s]+$/;
  return regex.test(number);
};
