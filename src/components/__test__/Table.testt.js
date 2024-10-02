import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table';

describe('Table', () => {
    const columns = [
        { key: 'name', header: 'Name' },
        { key: 'age', header: 'Age' },
    ];

    const data = [
        { name: 'John Doe', age: 30 },
        { name: 'Jane Doe', age: 25 },
    ];

    test('renders table with correct headers and data', () => {
        render(<Table columns={columns} data={data} />);

        // Check if headers are rendered correctly
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();

        // Check if data is rendered correctly
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
    });

    test('renders custom cell content when column.render is provided', () => {
        const customColumns = [
            { key: 'name', header: 'Name' },
            { 
                key: 'age', 
                header: 'Age', 
                render: (row) => <span>{row.age} years old</span> 
            },
        ];

        render(<Table columns={customColumns} data={data} />);

        // Check if custom render content is displayed correctly
        expect(screen.getByText('30 years old')).toBeInTheDocument();
        expect(screen.getByText('25 years old')).toBeInTheDocument();
    });
});
