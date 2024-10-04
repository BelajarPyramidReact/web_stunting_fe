import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders copyright text', () => {
    render(<Footer />);
    
    // Test that the copyright text is rendered
    const copyrightElement = screen.getByText(/© 2024. Web Stunting. All rights reserved./i);
    expect(copyrightElement).toBeInTheDocument();
  });

  test('renders links to Terms & Conditions, Privacy Policy, and Cookies', () => {
    render(<Footer />);
    
    // Test that the correct links are present in the document
    const termsLink = screen.getByText(/Terms & Conditions/i);
    const privacyLink = screen.getByText(/Privacy Policy/i);
    const cookiesLink = screen.getByText(/Cookies/i);
    
    expect(termsLink).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();
    expect(cookiesLink).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(<Footer />);
    
    // Test that social media icons are rendered using their accessible names
    const facebookIcon = screen.getByRole('link', { name: /facebook/i });
    const instagramIcon = screen.getByRole('link', { name: /instagram/i });
    const twitterIcon = screen.getByRole('link', { name: /twitter/i });
    const githubIcon = screen.getByRole('link', { name: /github/i });
    
    expect(facebookIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
  });
});
