import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ItemsList} from './ItemsList';
import type {Item} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';

describe('ItemsList Component', () => {
  const mockItems: Item[] = [
    {
      _id: '1',
      listId: 'list-1',
      name: 'Milk',
      quantity: 2,
      unit: 'liters',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: '2',
      listId: 'list-1',
      name: 'Bread',
      quantity: 1,
      unit: 'piece',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const mockFieldConfig: FieldConfig = {
    hasCheckbox: true,
    hasQuantity: true,
    hasExpiryDate: true,
  };

  const defaultProps = {
    items: mockItems,
    editingState: {},
    checkedItems: {},
    fieldConfig: mockFieldConfig,
    onCheck: vi.fn(),
    onCheckMultiple: vi.fn(),
    onDelete: vi.fn(),
  };

  it('should render items in the list', () => {
    render(<ItemsList {...defaultProps} />);
    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
  });

  it('should render correct number of items', () => {
    render(<ItemsList {...defaultProps} />);
    const itemElements = screen.getAllByText(/Milk|Bread/);
    expect(itemElements.length).toBeGreaterThanOrEqual(2);
  });

  it('should render items as cards', () => {
    const {container} = render(<ItemsList {...defaultProps} />);
    const cards = container.querySelectorAll('[class*="MuiCard"]');
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });

  it('should render empty list when no items provided', () => {
    render(<ItemsList {...defaultProps} items={[]} />);
    expect(screen.queryByText('Milk')).not.toBeInTheDocument();
    expect(screen.queryByText('Bread')).not.toBeInTheDocument();
  });

  it('should use grid layout for items', () => {
    const {container} = render(<ItemsList {...defaultProps} />);
    const boxes = container.querySelectorAll('[class*="MuiBox"]');
    expect(boxes.length).toBeGreaterThan(0);
  });

  it('should apply field config to items', () => {
    const configWithoutQuantity: FieldConfig = {
      hasCheckbox: true,
      hasQuantity: false,
    };

    render(<ItemsList {...defaultProps} fieldConfig={configWithoutQuantity} />);
    expect(screen.getByText('Milk')).toBeInTheDocument();
  });
});
