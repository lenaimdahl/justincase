import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ItemTable} from './ItemTable';
import type {Item} from 'src/types/item';

describe('ItemTable Component', () => {
  const mockItems: Item[] = [
    {
      _id: '1',
      listId: 'list-1',
      name: 'Apple',
      quantity: 5,
      unit: 'pieces',
    },
    {
      _id: '2',
      listId: 'list-1',
      name: 'Orange',
      quantity: 3,
      unit: 'pieces',
    },
  ];

  const defaultProps = {
    listId: 'list-1',
    items: mockItems,
    loading: false,
    onItemsChange: vi.fn(),
  };

  it('should render table container', () => {
    render(<ItemTable {...defaultProps} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should render loading spinner when loading', () => {
    render(<ItemTable {...defaultProps} loading={true} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  it('should not show items when loading', () => {
    render(<ItemTable {...defaultProps} loading={true} />);

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('should render table head', () => {
    render(<ItemTable {...defaultProps} />);

    const thead = document.querySelector('thead');
    expect(thead).toBeInTheDocument();
  });

  it('should render items in table rows', () => {
    render(<ItemTable {...defaultProps} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Orange')).toBeInTheDocument();
  });

  it('should display item quantities', () => {
    render(<ItemTable {...defaultProps} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render empty table when no items provided', () => {
    render(<ItemTable {...defaultProps} items={[]} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Table head should exist but no item rows
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('should initialize with provided listId', () => {
    render(<ItemTable {...defaultProps} listId="test-list-123" />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
