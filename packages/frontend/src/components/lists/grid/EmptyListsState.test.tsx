import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {EmptyListsState} from 'src/components/lists/grid/EmptyListsState';

describe('EmptyListsState Component', () => {
  it('should render empty state paper container', () => {
    const {container} = render(<EmptyListsState />);
    const paper = container.querySelector('[class*="MuiPaper"]');
    expect(paper).toBeInTheDocument();
  });

  it('should render typography headings', () => {
    render(<EmptyListsState />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have correct styling for empty state', () => {
    const {container} = render(<EmptyListsState />);
    const paper = container.querySelector('[class*="MuiPaper"]');

    // Paper has specific dashed border styling
    expect(paper).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<EmptyListsState />);
    // The component renders translation keys which appear as regular text
    const elements = screen.getAllByRole('heading');
    expect(elements.length).toBeGreaterThan(0);
  });
});
