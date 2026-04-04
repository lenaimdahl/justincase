import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import {ItemCard} from './ItemCard';
import type {Item} from 'src/types/item';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('src/utils/dateHelpers', () => ({
  getStatusClassName: () => 'status-class',
}));

const mockItem: Item = {
  _id: '1',
  name: 'Test Item',
  quantity: 2,
  unit: 'pcs',
  expiryDate: '2026-04-10',
  comment: 'Test notes|priority:⭐',
  listId: 'list-1',
};

describe('ItemCard', () => {
  it('renders item name', () => {
    render(
      <ItemCard
        item={mockItem}
        state={mockItem}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('extracts priority from comment', () => {
    render(
      <ItemCard
        item={mockItem}
        state={mockItem}
        fieldConfig={{hasPriority: true, hasNotes: true}}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('extracts notes from comment, preserving notes before priority', () => {
    render(
      <ItemCard
        item={mockItem}
        state={mockItem}
        fieldConfig={{hasPriority: true, hasNotes: true}}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText('Test notes')).toBeInTheDocument();
  });

  it('displays quantity with increment/decrement buttons', () => {
    const onAdjustQuantity = vi.fn();
    render(
      <ItemCard
        item={mockItem}
        state={mockItem}
        fieldConfig={{hasQuantity: true}}
        onAdjustQuantity={onAdjustQuantity}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText('2')).toBeInTheDocument();

    const increaseButton = screen.getByLabelText('components.ariaLabels.increaseQuantity');
    fireEvent.click(increaseButton);
    expect(onAdjustQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('calls onDelete when delete button clicked', () => {
    const onDelete = vi.fn();
    render(
      <ItemCard
        item={mockItem}
        state={mockItem}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={onDelete}
      />
    );
    const deleteButton = screen.getByLabelText('components.ariaLabels.deleteItem');
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('disables interactions when readOnly is true', () => {
    const onAdjustQuantity = vi.fn();
    const onDelete = vi.fn();
    render(
      <ItemCard
        item={mockItem}
        state={mockItem}
        fieldConfig={{hasQuantity: true}}
        onAdjustQuantity={onAdjustQuantity}
        onUpdateField={vi.fn()}
        onDelete={onDelete}
        readOnly={true}
      />
    );
    
    const increaseButton = screen.getByLabelText('components.ariaLabels.increaseQuantity');
    expect(increaseButton).toBeDisabled();
    
    const deleteButton = screen.getByLabelText('components.ariaLabels.deleteItem');
    expect(deleteButton).toBeDisabled();
  });

  it('applies error styling when state has error', () => {
    const errorState = {...mockItem, error: 'Test error'};
    const {container} = render(
      <ItemCard
        item={mockItem}
        state={errorState}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    const card = container.querySelector('.MuiCard-root');
    expect(card).toHaveStyle({backgroundColor: '#ffebee'});
  });

  it('respects fieldConfig for displaying fields', () => {
    render(
      <ItemCard
        item={mockItem}
        state={mockItem}
        fieldConfig={{
          hasQuantity: false,
          hasUnit: false,
          hasExpiryDate: false,
          hasPriority: false,
          hasNotes: false,
        }}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.queryByText('common.quantity')).not.toBeInTheDocument();
    expect(screen.queryByText('common.unit')).not.toBeInTheDocument();
  });

  it('handles comment without priority delimiter', () => {
    const itemWithoutPriority = {...mockItem, comment: 'Just notes'};
    render(
      <ItemCard
        item={itemWithoutPriority}
        state={itemWithoutPriority}
        fieldConfig={{hasNotes: true, hasPriority: true}}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.getByText('Just notes')).toBeInTheDocument();
    expect(screen.queryByText(/⭐|🔸|🤍/)).not.toBeInTheDocument();
  });

  it('disables buttons when isSaving is true', () => {
    const savingState = {...mockItem, isSaving: true};
    render(
      <ItemCard
        item={mockItem}
        state={savingState}
        fieldConfig={{hasQuantity: true}}
        onAdjustQuantity={vi.fn()}
        onUpdateField={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    const increaseButton = screen.getByLabelText('components.ariaLabels.increaseQuantity');
    expect(increaseButton).toBeDisabled();
  });
});
