import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Navigation} from './Navigation';

describe('Navigation Component', () => {
  it('should render the navigation component', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should have a home link', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole('link', {name: /justincase|home/i});
    expect(homeLink).toBeInTheDocument();
  });
});
