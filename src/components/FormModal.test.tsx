import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import FormModal from './FormModal';

describe('FormModal Component', () => {
    test('renders FormModal component and displays the form data', () => {
        render(
            <Provider store={store}>
                <FormModal open={true} handleClose={jest.fn()} />
            </Provider>
        );

        // Check if modal is rendered with form data labels
        expect(screen.getByText(/form summary/i)).toBeInTheDocument();
        expect(screen.getByText(/name:/i)).toBeInTheDocument();
        expect(screen.getByText(/age:/i)).toBeInTheDocument();
        expect(screen.getByText(/country:/i)).toBeInTheDocument();
    });

    test('calls handleClose when Close button is clicked', () => {
        const mockHandleClose = jest.fn();

        render(
            <Provider store={store}>
                <FormModal open={true} handleClose={mockHandleClose} />
            </Provider>
        );

        fireEvent.click(screen.getByText(/close/i));

        expect(mockHandleClose).toHaveBeenCalled();
    });
});
