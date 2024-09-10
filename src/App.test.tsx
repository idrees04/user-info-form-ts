import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

describe('App Component', () => {
    test('renders the App component and its children', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // Check if the header and form are rendered
        expect(screen.getByText(/user information form/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });
});
