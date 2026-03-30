import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ListCard} from 'src/components/lists/ListCard';
import type {List} from 'src/types/list';

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

  it('should render list card with name', () => {
    const handleClick = vi.fn();
    render(<ListCard {...mockList} onClick={handleClick} />);
    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  it('should render item count', () => {
    const handleClick = vi.fn();
    render(<ListCard {...mockList} onClick={handleClick} />);
    expect(screen.getByText('5 Items')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<ListCard {...mockList} onClick={handleClick} />);

    const cardButton = screen.getByRole('button');
    await user.click(cardButton);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should have correct aria label', () => {
    const handleClick = vi.fn();
    render(<ListCard {...mockList} onClick={handleClick} />);

    const cardButton = screen.getByRole('button');
    expect(cardButton).toHaveAttribute('aria-label', 'Test List, 5 items');
  });
});
