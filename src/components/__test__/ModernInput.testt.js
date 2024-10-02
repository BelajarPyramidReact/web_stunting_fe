import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ModernInput from '../ModernInput';

describe('ModernInput Component', () => {
  test('renders a text input with a label', () => {
    render(
      <ModernInput
        label="Name"
        name="name"
        value=""
        onChange={() => {}}
        placeholder="Enter your name"
      />
    );

    // Check that the label is rendered
    const labelElement = screen.getByText(/name/i);
    expect(labelElement).toBeInTheDocument();

    // Check that the input is rendered with the placeholder
    const inputElement = screen.getByPlaceholderText(/enter your name/i);
    expect(inputElement).toBeInTheDocument();
  });
  

  test('renders a select input with options', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
  
    render(
      <ModernInput
        label="Select Option"
        name="options"
        type="select"
        value=""
        onChange={() => {}}
        options={options}
      />
    );
  
    // Check that the select input is rendered
    const selectElement = screen.getByRole('combobox'); 
    expect(selectElement).toBeInTheDocument();
  
    // Check that options are rendered
    const option1 = screen.getByText(/option 1/i);
    const option2 = screen.getByText(/option 2/i);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });
  

  test('renders an input with an error message', () => {
    render(
      <ModernInput
        label="Password"
        name="password"
        value=""
        onChange={() => {}}
        placeholder="Enter your password"
        error="Password is required"
      />
    );

    // Check that the input is rendered
    const inputElement = screen.getByPlaceholderText(/enter your password/i);
    expect(inputElement).toBeInTheDocument();

    // Check that the error message is rendered
    const errorElement = screen.getByText(/password is required/i);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
  });

  test('renders a checkbox input with options', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    const value = ['option1'];

    render(
      <ModernInput
        label="Choose Options"
        name="checkbox"
        type="checkbox"
        value={value}
        onChange={() => {}}
        options={options}
      />
    );

    // Check that checkboxes are rendered
    const option1Checkbox = screen.getByLabelText(/option 1/i);
    const option2Checkbox = screen.getByLabelText(/option 2/i);

    expect(option1Checkbox).toBeInTheDocument();
    expect(option2Checkbox).toBeInTheDocument();

    // Check that the first checkbox is checked
    expect(option1Checkbox).toBeChecked();
    expect(option2Checkbox).not.toBeChecked();
  });

  test('renders a radio input with options', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    render(
      <ModernInput
        label="Choose One"
        name="radio"
        type="radio"
        value="option1"
        onChange={() => {}}
        options={options}
      />
    );

    // Check that radio buttons are rendered
    const option1Radio = screen.getByLabelText(/option 1/i);
    const option2Radio = screen.getByLabelText(/option 2/i);

    expect(option1Radio).toBeInTheDocument();
    expect(option2Radio).toBeInTheDocument();

    // Check that the first radio is selected
    expect(option1Radio).toBeChecked();
    expect(option2Radio).not.toBeChecked();
  });

  test('handles onChange for text input', () => {
    const handleChange = jest.fn();

    render(
      <ModernInput
        label="Username"
        name="username"
        value=""
        onChange={handleChange}
        placeholder="Enter your username"
      />
    );

    // Simulate user typing
    const inputElement = screen.getByPlaceholderText(/enter your username/i);
    fireEvent.change(inputElement, { target: { value: 'new_username' } });

    // Check that handleChange was called
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
