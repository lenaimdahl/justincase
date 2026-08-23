import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ListCard} from 'src/components/lists/card/ListCard';
import type {List} from 'src/types/list';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: {count?: number}) => (options?.count !== undefined ? `${options.count} items` : key),
  }),
}));

describe('ListCard Component', () => {
  const mockList: List = {
    id: '1',
    name: 'Test List',
    itemCount: 5,
    items: [],
    icon: '📝',
    color: '#6a1b9a',
    fieldConfig: {
      hasCheckbox: true,
      hasQuantity: false,
      hasNotes: false,
      hasPriority: false,
    },
  };

  const renderCard = (overrides: Partial<{onClick: () => void; onEdit: () => void; onDelete: () => void}> = {}) => {
    const handleClick = overrides.onClick ?? vi.fn();
    const handleEdit = overrides.onEdit ?? vi.fn();
    const handleDelete = overrides.onDelete ?? vi.fn();
    render(<ListCard {...mockList} onClick={handleClick} onEdit={handleEdit} onDelete={handleDelete} />);
    return {handleClick, handleEdit, handleDelete};
  };

  it('should render list card with name', () => {
    renderCard();
    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  it('should render item count', () => {
    renderCard();
    expect(screen.getByText('5 items')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const {handleClick} = renderCard();

    const cardButton = screen.getByRole('button', {name: 'Test List, 5 items'});
    await user.click(cardButton);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should have correct aria label', () => {
    renderCard();

    const cardButton = screen.getByRole('button', {name: 'Test List, 5 items'});
    expect(cardButton).toHaveAttribute('aria-label', 'Test List, 5 items');
  });

  it('should call onEdit and not onClick when Edit is selected from the menu', async () => {
    const user = userEvent.setup();
    const {handleClick, handleEdit} = renderCard();

    await user.click(screen.getByRole('button', {name: 'components.ariaLabels.listOptions'}));
    await user.click(screen.getByText('common.edit'));

    expect(handleEdit).toHaveBeenCalledOnce();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should call onDelete and not onClick when Delete is selected from the menu', async () => {
    const user = userEvent.setup();
    const {handleClick, handleDelete} = renderCard();

    await user.click(screen.getByRole('button', {name: 'components.ariaLabels.listOptions'}));
    await user.click(screen.getByText('common.delete'));

    expect(handleDelete).toHaveBeenCalledOnce();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
