import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText((content, element) => {
    // Check if the text content includes "learn react" (case insensitive)
    return content.toLowerCase().includes('learn react');
  });
  expect(linkElement).toBeInTheDocument();
});
