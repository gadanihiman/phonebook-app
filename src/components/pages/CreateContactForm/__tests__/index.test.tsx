import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import {
  ADD_CONTACT,
  GET_ALL_CONTACT_NAMES,
  GET_CONTACT
} from '@/queries/contactQueries';

import CreateContactForm from '..';

const mocks = [
  {
    request: {
      query: GET_ALL_CONTACT_NAMES,
    },
    result: {
      data: {
        contact: [
          { first_name: 'Gadani', last_name: 'Gurusinga' },
          { first_name: 'Hinata', last_name: 'Hyuga' },
        ],
      },
    },
  },
  {
    request: {
      query: ADD_CONTACT,
      variables: {
        first_name: 'Georgina',
        last_name: 'Laura',
        phones: [{ number: '08889827187' }],
      },
    },
    result: {
      data: {
        addContact: {
          id: '1',
          first_name: 'Georgina',
          last_name: 'Laura',
          phones: [{ number: '08889827187' }],
        },
      },
    },
  },
  {
    request: {
      query: GET_CONTACT,
      variables: {
        limit: 10,
        offset: 0,
        searchTerm: '%',
      },
    },
    result: {
      data: {
        contact: [
          {
            id: '1',
            first_name: 'Sasuke',
            last_name: 'Uchiha',
            phones: [{ number: '1234567890' }],
          },
        ],
      },
    },
  },
];

test('renders a form to create a new contact', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateContactForm />
    </MockedProvider>
  );

  const firstNameInput = screen.getByPlaceholderText('First Name');
  const lastNameInput = screen.getByPlaceholderText('Last Name');
  const phoneNumbersInput = screen.getByPlaceholderText('Phone Numbers (comma separated)');
  const createButton = screen.getByText('Create');

  fireEvent.change(firstNameInput, { target: { value: 'Georgina' } });
  fireEvent.change(lastNameInput, { target: { value: 'Laura' } });
  fireEvent.change(phoneNumbersInput, { target: { value: '08889827187' } });
  fireEvent.click(createButton);

  await waitFor(() => {
    expect(screen.getByText('Contact successfully added!')).toBeInTheDocument();
  });
});

test('displays validation error when first name is missing', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateContactForm />
    </MockedProvider>
  );

  const lastNameInput = screen.getByPlaceholderText('Last Name');
  const phoneNumbersInput = screen.getByPlaceholderText('Phone Numbers (comma separated)');
  const createButton = screen.getByText('Create');

  fireEvent.change(lastNameInput, { target: { value: 'Laura' } });
  fireEvent.change(phoneNumbersInput, { target: { value: '08889827187' } });
  fireEvent.click(createButton);

  await waitFor(() => {
    expect(screen.getByText('First name and last name are required.')).toBeInTheDocument();
  });
});
