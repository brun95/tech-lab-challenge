import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
import { render, screen } from '@testing-library/react';
import Header from '../../src/Components/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  test('renders the title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>);
    const title = screen.getByRole('heading', { level: 1, name: /jumping on the clouds/i });
    expect(title).toBeInTheDocument();
  });

  test('renders the navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const adminLink = screen.getByRole('link', { name: /admin/i });
    expect(homeLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();
  });

});