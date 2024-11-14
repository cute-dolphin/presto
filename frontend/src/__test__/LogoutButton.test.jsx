import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LogoutButton } from '../components/LogoutButton';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LogoutButton Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders logout button correctly', () => {
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls LogoutCallback and clears localStorage on button click', async () => {
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(null);
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5005/admin/auth/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer test-token',
        },
      });
    });
  });
});
