import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from '../PaginationControls';

describe('PaginationControls', () => {
    test('renders the current page and total pages', () => {
        render(
            <PaginationControls
                currentPage={2}
                totalPages={5}
                onPageChange={jest.fn()}
            />
        );

        // Assert that the current page and total pages are rendered correctly
        expect(screen.getByText('Halaman 2 dari 5')).toBeInTheDocument();
    });

    test('disables the "previous" button on the first page', () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={5}
                onPageChange={jest.fn()}
            />
        );

        // The "previous" button should be disabled
        expect(screen.getByLabelText('Previous page')).toBeDisabled();
    });

    test('disables the "next" button on the last page', () => {
        render(
            <PaginationControls
                currentPage={5}
                totalPages={5}
                onPageChange={jest.fn()}
            />
        );

        // The "next" button should be disabled
        expect(screen.getByLabelText('Next page')).toBeDisabled();
    });

    test('calls onPageChange with the previous page when clicking the "previous" button', () => {
        const onPageChangeMock = jest.fn();
        render(
            <PaginationControls
                currentPage={2}
                totalPages={5}
                onPageChange={onPageChangeMock}
            />
        );

        // Click the "previous" button
        fireEvent.click(screen.getByLabelText('Previous page'));

        // Assert that onPageChange was called with the correct argument
        expect(onPageChangeMock).toHaveBeenCalledWith(1);
    });

    test('calls onPageChange with the next page when clicking the "next" button', () => {
        const onPageChangeMock = jest.fn();
        render(
            <PaginationControls
                currentPage={2}
                totalPages={5}
                onPageChange={onPageChangeMock}
            />
        );

        // Click the "next" button
        fireEvent.click(screen.getByLabelText('Next page'));

        // Assert that onPageChange was called with the correct argument
        expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });
});
