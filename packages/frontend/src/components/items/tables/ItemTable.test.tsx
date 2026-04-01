import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import {ItemTable} from 'src/components/items/tables/ItemTable';
import {NotificationProvider} from 'src/contexts/NotificationContext';
import type {Item} from 'src/types/item';

// Mock the API calls
vi.mock('src/api/items', () => ({
  createItem: vi.fn(),
  updateItem: vi.fn(),
  deleteItem: vi.fn(),
  adjustItemQuantity: vi.fn(),
}));

const renderWithNotification = (component: React.ReactNode) => {
  return render(<NotificationProvider>{component}</NotificationProvider>);
};

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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table container', async () => {
    renderWithNotification(<ItemTable {...defaultProps} />);

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });

  it('should render loading spinner when loading', () => {
    renderWithNotification(<ItemTable {...defaultProps} loading={true} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  it('should not show items when loading', () => {
    renderWithNotification(<ItemTable {...defaultProps} loading={true} />);

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('should render table head', async () => {
    renderWithNotification(<ItemTable {...defaultProps} />);

    await waitFor(() => {
      const thead = document.querySelector('thead');
      expect(thead).toBeInTheDocument();
    });
  });

  it('should render items in table rows', async () => {
    renderWithNotification(<ItemTable {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Orange')).toBeInTheDocument();
    });
  });

  it('should display item quantities', async () => {
    renderWithNotification(<ItemTable {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  it('should render empty table when no items provided', async () => {
    renderWithNotification(<ItemTable {...defaultProps} items={[]} />);

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    // Table head should exist but no item rows
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('should initialize with provided listId', async () => {
    renderWithNotification(<ItemTable {...defaultProps} listId="test-list-123" />);

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });
});
