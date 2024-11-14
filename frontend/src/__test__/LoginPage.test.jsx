import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../components/LoginPage';
import { MemoryRouter } from 'react-router-dom';

describe('LoginPage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // test whether could success render
  it('renders input fields and submit button', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // check email,password input and submit exist
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  // test email and password could be store and update state when input value
  it('updates state on input change', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
