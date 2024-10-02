import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AnthropometricMeasurementCreate from '../../Antropometri/AnthropometricMeasurementCreate';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('AnthropometricMeasurementCreate', () => {
  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/children/1/create']}>
        <Routes>
          <Route path="/children/:children_id/create" element={<AnthropometricMeasurementCreate />} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form inputs and submit button', () => {
    renderComponent();

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText(/tanggal pengukuran/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/berat badan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tinggi badan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lingkar kepala/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lingkar perut/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lingkar kaki/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lingkar lengan/i)).toBeInTheDocument();

    // Assert that the submit button is rendered
    expect(screen.getByRole('button', { name: /simpan pengukuran/i })).toBeInTheDocument();
  });

  test('submits the form successfully and shows success message', async () => {
    axios.post.mockResolvedValue({ status: 200 });

    renderComponent();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/tanggal pengukuran/i), {
      target: { value: '2024-09-30' },
    });
    fireEvent.change(screen.getByLabelText(/berat badan/i), {
      target: { value: '12.5' },
    });
    fireEvent.change(screen.getByLabelText(/tinggi badan/i), {
      target: { value: '85.5' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /simpan pengukuran/i }));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText(/data pengukuran berhasil disimpan/i)).toBeInTheDocument();
    });

    // Check that Axios was called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:6543/measurements/children/1`,
      expect.objectContaining({
        measurement_date: '2024-09-30',
        measurement_weight: '12.5',
        measurement_height: '85.5',
      }),
      expect.any(Object)
    );
  });

  test('handles server error gracefully', async () => {
    axios.post.mockRejectedValue(new Error('Failed to submit data'));

    renderComponent();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/tanggal pengukuran/i), {
      target: { value: '2024-09-30' },
    });
    fireEvent.change(screen.getByLabelText(/berat badan/i), {
      target: { value: '12.5' },
    });
    fireEvent.change(screen.getByLabelText(/tinggi badan/i), {
      target: { value: '85.5' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /simpan pengukuran/i }));

    // Ensure Axios was called and handled the error
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
