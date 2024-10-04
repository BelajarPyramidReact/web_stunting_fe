import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotificationModal from '../NotificationModal';

describe('NotificationModal', () => {
    test('renders the modal with title and message when isOpen is true', () => {
        render(
            <NotificationModal 
                isOpen={true} 
                onClose={jest.fn()} 
                title="Error Occurred" 
                message="Something went wrong!" 
            />
        );

        // Assert that title and message are rendered
        expect(screen.getByText('Error Occurred')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    });

    test('does not render the modal when isOpen is false', () => {
        const { queryByText } = render(
            <NotificationModal 
                isOpen={false} 
                onClose={jest.fn()} 
                title="Error Occurred" 
                message="Something went wrong!" 
            />
        );

        // Assert that the modal is not in the document
        expect(queryByText('Error Occurred')).not.toBeInTheDocument();
    });

    test('calls onClose after clicking the close button', async () => {
        const onCloseMock = jest.fn();

        render(
            <NotificationModal 
                isOpen={true} 
                onClose={onCloseMock} 
                title="Error Occurred" 
                message="Something went wrong!" 
            />
        );

        // Click the close button
        fireEvent.click(screen.getByText('Tutup'));

        // Wait for onClose to be called after the transition duration (300ms)
        await waitFor(() => expect(onCloseMock).toHaveBeenCalled(), { timeout: 500 });
    });

    test('closes the modal automatically after the specified duration', async () => {
        const onCloseMock = jest.fn();

        render(
            <NotificationModal 
                isOpen={true} 
                onClose={onCloseMock} 
                title="Error Occurred" 
                message="Something went wrong!" 
                duration={1000} 
            />
        );

        // Wait for the duration to pass and assert onClose is called
        await waitFor(() => {
            expect(onCloseMock).toHaveBeenCalled();
        }, { timeout: 1500 });
    });

    test('does not auto-close if duration is 0', () => {
        const onCloseMock = jest.fn();

        render(
            <NotificationModal 
                isOpen={true} 
                onClose={onCloseMock} 
                title="Error Occurred" 
                message="Something went wrong!" 
                duration={0} 
            />
        );

        // Wait a moment and ensure onClose was not called
        setTimeout(() => {
            expect(onCloseMock).not.toHaveBeenCalled();
        }, 1500);
    });
});
