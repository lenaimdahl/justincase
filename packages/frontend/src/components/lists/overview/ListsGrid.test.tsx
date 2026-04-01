import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ListsGrid} from 'src/components/lists/overview/ListsGrid';
import type {List} from 'src/types/list';

describe('ListsGrid Component', () => {
  const mockLists: List[] = [
    {
      id: '1',
      name: 'Groceries',
      itemCount: 8,
      items: [],
      icon: '🛒',
      color: '#FF6B6B',
      fieldConfig: {hasCheckbox: true, hasQuantity: true},
    },
    {
      id: '2',
      name: 'Todo',
      itemCount: 5,
      items: [],
      icon: '✓',
      color: '#4ECDC4',
      fieldConfig: {hasCheckbox: true},
    },
  ];

  it('should render grid container', () => {
    const handleListClick = vi.fn();
    const {container} = render(<ListsGrid lists={mockLists} onListClick={handleListClick} />);

    // Box component creates a grid layout - check for MuiBox
    const gridContainer = container.querySelector('[class*="MuiBox"]');
    expect(gridContainer).toBeInTheDocument();
  });

  it('should render all lists as cards', () => {
    const handleListClick = vi.fn();
    render(<ListsGrid lists={mockLists} onListClick={handleListClick} />);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Todo')).toBeInTheDocument();
  });

  it('should display correct item counts', () => {
    const handleListClick = vi.fn();
    render(<ListsGrid lists={mockLists} onListClick={handleListClick} />);

    expect(screen.getByText('8 Items')).toBeInTheDocument();
    expect(screen.getByText('5 Items')).toBeInTheDocument();
  });

  it('should call onListClick when a list card is clicked', async () => {
    const handleListClick = vi.fn();
    const user = userEvent.setup();
    render(<ListsGrid lists={mockLists} onListClick={handleListClick} />);

    const groceriesButton = screen.getByLabelText(/Groceries/);
    await user.click(groceriesButton);

    expect(handleListClick).toHaveBeenCalledWith('1');
  });

  it('should render empty grid when no lists provided', () => {
    const handleListClick = vi.fn();
    render(<ListsGrid lists={[]} onListClick={handleListClick} />);

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('should render cards in correct order', () => {
    const handleListClick = vi.fn();
    render(<ListsGrid lists={mockLists} onListClick={handleListClick} />);

    const allButtons = screen.getAllByRole('button');
    expect(allButtons[0]).toHaveAttribute('aria-label', expect.stringContaining('Groceries'));
    expect(allButtons[1]).toHaveAttribute('aria-label', expect.stringContaining('Todo'));
  });
});
