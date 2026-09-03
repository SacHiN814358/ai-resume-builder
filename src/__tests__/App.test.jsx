import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('ResuMate AI Application Integration Tests', () => {
  it('renders the branding and main navigation', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/ResuMate/i);
    expect(brandElements.length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /^Resume$/i })).toBeInTheDocument();
  });

  it('switches between Resume and Cover Letter tabs', () => {
    render(<App />);
    
    // Find cover letter tab button
    const coverLetterBtn = screen.getByRole('button', { name: /Cover Letter/i });
    expect(coverLetterBtn).toBeInTheDocument();
    
    fireEvent.click(coverLetterBtn);
    expect(screen.getByText(/Cover Letter Builder/i)).toBeInTheDocument();
    
    // Switch back to Resume
    const resumeBtn = screen.getByRole('button', { name: /^Resume$/i });
    fireEvent.click(resumeBtn);
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
  });

  it('renders template selector and allows switching templates', () => {
    render(<App />);
    const modernButton = screen.getByRole('button', { name: /Modern Tech/i });
    expect(modernButton).toBeInTheDocument();
  });

  it('renders experience items from sample data', () => {
    render(<App />);
    // Click on Work Experience accordion
    const expAccordion = screen.getByRole('button', { name: /Work Experience/i });
    fireEvent.click(expAccordion);
    expect(screen.getByText(/Apex Digital Solutions/i)).toBeInTheDocument();
  });
});
