import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {ListCard} from './ListCard';
import type {List} from 'src/types/list';

describe('ListCard Component', () => {
  const mockList: List = {
    _id: '1',
    name: 'Test List',
    description: 'A test list description',
    color: '#FF5733',
    icon: '🛒',
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('should render list card with name', () => {
    render(
      <BrowserRouter>
        <ListCard list={mockList} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  it('should render list description', () => {
    render(
      <BrowserRouter>
        <ListCard list={mockList} />
      </BrowserRouter>
    );
    expect(screen.getByText('A test list description')).toBeInTheDocument();
  });

  it('should display the list icon', () => {
    render(
      <BrowserRouter>
        <ListCard list={mockList} />
      </BrowserRouter>
    );
    expect(screen.getByText('🛒')).toBeInTheDocument();
  });

  it('should have a link to the list detail page', () => {
    render(
      <BrowserRouter>
        <ListCard list={mockList} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/lists/${mockList._id}`);
  });
});
