import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MediaCard from '../components/MediaCard';
import { BrowserRouter } from 'react-router-dom';

describe('MediaCard Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  // if no data, blank
  it('renders null if no presentations are provided', () => {
    render(
      <BrowserRouter>
        <MediaCard presentation={null} />
      </BrowserRouter>
    );
    const pagesText = screen.queryByText(/Pages/i);
    expect(pagesText).toBe(null);
  });

  //if there is one presentation, should have one card
  it('renders a list of presentations', () => {
    const mockData = {
      presentation1: {
        "title": "fhw",
        "thumbnail": "hahaha",
        "content":[{
          "elements": [
            {
              "type": "text",
              "text": "999999",
            }
          ]
        }]
      },
    };

    render(
      <BrowserRouter>
        <MediaCard presentation={mockData} />
      </BrowserRouter>
    );
    expect(screen.getByText('fhw')).toBeInTheDocument();
    expect(screen.getByText('1 Pages')).toBeInTheDocument();
  });
});