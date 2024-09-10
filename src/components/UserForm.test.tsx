import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import UserForm from './UserForm';

describe('UserForm Component', () => {
    test('renders UserForm component', () => {
        render(
            <Provider store={store}>
                <UserForm openModal={jest.fn()} />
            </Provider>
        );

        // Check if form elements are rendered
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    });

    test('validates form inputs and shows error messages', async () => {
        render(
            <Provider store={store}>
                <UserForm openModal={jest.fn()} />
            </Provider>
        );

        // Submit form without filling in the inputs
        fireEvent.click(screen.getByText(/submit/i));

        // Expect validation errors to appear
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/age is required/i)).toBeInTheDocument();
        expect(screen.getByText(/country is required/i)).toBeInTheDocument();
    });

    test('submits the form successfully when valid inputs are provided', () => {
        const mockOpenModal = jest.fn();

        render(
            <Provider store={store}>
                <UserForm openModal={mockOpenModal} />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '25' } });
        fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'USA' } });

        fireEvent.click(screen.getByText(/submit/i));

        expect(mockOpenModal).toHaveBeenCalled();
    });
});
