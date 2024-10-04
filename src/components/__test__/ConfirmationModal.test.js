import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationModal from '../ConfirmationModal';

describe('ConfirmationModal Component', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    const props = {
        isOpen: true,
        onClose,
        onConfirm,
        message: 'Are you sure you want to proceed?',
        title: 'Confirmation',
        confirmText: 'Yes',
        cancelText: 'No',
        duration: 0
    };

    it('renders the modal with correct title and message', () => {
        render(<ConfirmationModal {...props} />);
        
        expect(screen.getByText('Confirmation')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('calls the onConfirm function when confirm button is clicked', async () => {
        render(<ConfirmationModal {...props} />);
        
        const confirmButton = screen.getByText('Yes');
        fireEvent.click(confirmButton);
        
        await waitFor(() => expect(onConfirm).toHaveBeenCalled());
        await waitFor(() => expect(onClose).toHaveBeenCalled());
    });

    it('calls the onClose function when cancel button is clicked', async () => {
        render(<ConfirmationModal {...props} />);
        
        const cancelButton = screen.getByText('No');
        fireEvent.click(cancelButton);

        await waitFor(() => expect(onClose).toHaveBeenCalled());
    });

    it('does not render when isOpen is false', () => {
        render(<ConfirmationModal {...props} isOpen={false} />);

        expect(screen.queryByText('Confirmation')).toBeNull();
    });
});
