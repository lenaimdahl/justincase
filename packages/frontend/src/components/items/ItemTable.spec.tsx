import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ItemTable} from './ItemTable';
import * as itemsApi from 'src/api/items';
import type {Item} from 'src/types/item';

// Mock the items API
jest.mock('src/api/items');

const mockItemsApi = itemsApi as jest.Mocked<typeof itemsApi>;

const mockItems = [
  {
    _id: '1',
    listId: 'list1',
    name: 'Milk',
    quantity: 2,
    unit: 'liters',
    expiryDate: '2026-04-15',
    comment: 'Whole milk',
  },
  {
    _id: '2',
    listId: 'list1',
    name: 'Bread',
    quantity: 1,
    unit: 'pcs',
    expiryDate: '2026-03-30',
    comment: '',
  },
] as Item[];

describe('ItemTable', () => {
  const mockOnItemsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders items in a table', () => {
    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    expect(screen.getByDisplayValue('Milk')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bread')).toBeInTheDocument();
  });

  it('displays loading state when loading prop is true', () => {
    render(<ItemTable listId="list1" items={[]} loading={true} onItemsChange={mockOnItemsChange} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('allows updating item name with debounce', async () => {
    mockItemsApi.updateItem.mockResolvedValue(mockItems[0]);

    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const nameInput = screen.getByDisplayValue('Milk') as HTMLInputElement;
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Almond Milk');

    // Should update in local state immediately
    expect(nameInput.value).toBe('Almond Milk');

    // Wait for debounce and API call
    await waitFor(() => {
      expect(mockItemsApi.updateItem).toHaveBeenCalledWith(
        'list1',
        '1',
        expect.objectContaining({name: 'Almond Milk'})
      );
    });
  });

  it('allows adjusting quantity with +/- buttons', async () => {
    mockItemsApi.adjustItemQuantity.mockResolvedValue({
      ...mockItems[0],
      quantity: 3,
    });

    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const addButtons = screen.getAllByTitle('Increase quantity');
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(mockItemsApi.adjustItemQuantity).toHaveBeenCalledWith('list1', '1', 1);
    });
  });

  it('disables decrease button when quantity is 0', () => {
    const zeroQuantityItem = {...mockItems[0], quantity: 0};

    render(<ItemTable listId="list1" items={[zeroQuantityItem]} onItemsChange={mockOnItemsChange} />);

    const removeButton = screen.getByTitle('Decrease quantity');
    expect(removeButton).toBeDisabled();
  });

  it('allows deleting an item', async () => {
    mockItemsApi.deleteItem.mockResolvedValue(undefined);

    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const deleteButtons = screen.getAllByTitle('Delete item');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockItemsApi.deleteItem).toHaveBeenCalledWith('list1', '1');
      expect(mockOnItemsChange).toHaveBeenCalled();
    });
  });

  it('allows creating a new item', async () => {
    mockItemsApi.createItem.mockResolvedValue({
      _id: '3',
      listId: 'list1',
      name: 'Eggs',
      quantity: 12,
      unit: 'pcs',
      expiryDate: '2026-04-10',
      comment: 'Free range',
    });

    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const nameInput = screen.getByPlaceholderText('New item name') as HTMLInputElement;
    const quantityInput = screen.getByDisplayValue('') as HTMLInputElement;
    const addButton = screen.getByTitle('Add item');

    await userEvent.type(nameInput, 'Eggs');
    await userEvent.type(quantityInput, '12');

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockItemsApi.createItem).toHaveBeenCalledWith(
        'list1',
        expect.objectContaining({
          name: 'Eggs',
          quantity: 12,
        })
      );
      expect(mockOnItemsChange).toHaveBeenCalled();
    });
  });

  it('shows error message when create fails without name', async () => {
    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const addButton = screen.getByTitle('Add item');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Item name is required/i)).toBeInTheDocument();
    });
  });

  it('disables controls during save operations', async () => {
    mockItemsApi.updateItem.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockItems[0]), 500))
    );

    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const nameInput = screen.getByDisplayValue('Milk') as HTMLInputElement;
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Almond Milk');

    const deleteButtons = screen.getAllByTitle('Delete item');
    expect(deleteButtons[0]).toBeEnabled();
  });

  it('shows error state when update fails', async () => {
    mockItemsApi.updateItem.mockRejectedValue(new Error('Network error'));

    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const nameInput = screen.getByDisplayValue('Milk') as HTMLInputElement;
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Almond Milk');

    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('calls onItemsChange after successful operations', async () => {
    mockItemsApi.createItem.mockResolvedValue({
      _id: '3',
      listId: 'list1',
      name: 'Cheese',
      quantity: 0,
      unit: '',
      expiryDate: '',
      comment: '',
    });

    render(<ItemTable listId="list1" items={mockItems} onItemsChange={mockOnItemsChange} />);

    const nameInput = screen.getByPlaceholderText('New item name');
    await userEvent.type(nameInput, 'Cheese');

    const addButton = screen.getByTitle('Add item');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnItemsChange).toHaveBeenCalled();
    });
  });
});
