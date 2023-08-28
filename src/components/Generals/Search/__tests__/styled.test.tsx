import { render, screen } from '@testing-library/react';
import { SearchInput } from '../styled';

test('renders a search input with the correct styles', () => {
  render(<SearchInput />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveStyle(`
    padding: 10px 20px;
    flex: 1;
    border-radius: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
  `);
});
