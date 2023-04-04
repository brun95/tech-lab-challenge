import '@testing-library/jest-dom';
import ParticipationForm from '../../src/Components/ParticipationForm';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ParticipationForm component', () => {
  test('should render all input fields', () => {
    render(
        <MemoryRouter>
            <ParticipationForm />
        </MemoryRouter>);
    const emailInput = screen.getByLabelText('Email:');
    const firstNameInput = screen.getByLabelText('First Name:');
    const lastNameInput = screen.getByLabelText('Last Name:');
    const dateOfBirthInput = screen.getByLabelText('Date of Birth:');

    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(dateOfBirthInput).toBeInTheDocument();
  });
});