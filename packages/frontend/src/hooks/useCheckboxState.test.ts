import {describe, it, expect} from 'vitest';
import {renderHook, act} from '@testing-library/react';
import {useCheckboxState} from './useCheckboxState';

describe('useCheckboxState Hook', () => {
  it('should initialize with empty checked state', () => {
    const {result} = renderHook(() => useCheckboxState([]));
    expect(result.current.checkedItems.size).toBe(0);
  });

  it('should initialize with provided items', () => {
    const {result} = renderHook(() => useCheckboxState(['item1', 'item2']));
    expect(result.current.checkedItems.has('item1')).toBe(true);
    expect(result.current.checkedItems.has('item2')).toBe(true);
  });

  it('should toggle single checkbox state', () => {
    const {result} = renderHook(() => useCheckboxState([]));

    act(() => {
      result.current.handleCheck('item1');
    });

    expect(result.current.checkedItems.has('item1')).toBe(true);

    act(() => {
      result.current.handleCheck('item1');
    });

    expect(result.current.checkedItems.has('item1')).toBe(false);
  });

  it('should handle multiple items', () => {
    const {result} = renderHook(() => useCheckboxState([]));

    act(() => {
      result.current.handleCheck('item1');
      result.current.handleCheck('item2');
    });

    expect(result.current.checkedItems.has('item1')).toBe(true);
    expect(result.current.checkedItems.has('item2')).toBe(true);
    expect(result.current.checkedItems.size).toBe(2);
  });

  it('should toggle all items', () => {
    const itemIds = ['item1', 'item2', 'item3'];
    const {result} = renderHook(() => useCheckboxState([]));

    // Toggle all on
    act(() => {
      result.current.handleToggleAll(itemIds);
    });

    itemIds.forEach(id => {
      expect(result.current.checkedItems.has(id)).toBe(true);
    });

    // Toggle all off
    act(() => {
      result.current.handleToggleAll(itemIds);
    });

    itemIds.forEach(id => {
      expect(result.current.checkedItems.has(id)).toBe(false);
    });
  });

  it('should reset all checked items', () => {
    const {result} = renderHook(() => useCheckboxState(['item1', 'item2']));
    expect(result.current.checkedItems.size).toBe(2);

    act(() => {
      result.current.reset();
    });

    expect(result.current.checkedItems.size).toBe(0);
  });
});
