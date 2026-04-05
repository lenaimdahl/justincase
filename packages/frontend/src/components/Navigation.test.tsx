import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from 'src/contexts/AuthContext';
import {Navigation} from 'src/components/Navigation';

describe('Navigation Component', () => {
  it('should render the navigation component', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthProvider>
    );
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
  });

  it('should have navigation links', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthProvider>
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have a home link', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthProvider>
    );
    const homeLink = screen.getByRole('link', {name: /components.navigation.home/i});
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
