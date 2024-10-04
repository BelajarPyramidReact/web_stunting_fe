import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  test('renders the logo and heading text', () => {
    render(<Navbar />);

    // Check that the SVG logo is rendered
    const logoElement = screen.getByRole('img', { hidden: true });
    expect(logoElement).toBeInTheDocument();

    // Check that the heading text 'Web Stunting' is rendered
    const headingElement = screen.getByText(/Web Stunting/i);
    expect(headingElement).toBeInTheDocument();
  });

});
