import {describe, it, expect} from 'vitest';
import {renderHook, act} from '@testing-library/react';
import {useCheckboxState} from './useCheckboxState';

describe('useCheckboxState Hook', () => {
  it('should initialize with empty checked state', () => {
    const {result} = renderHook(() => useCheckboxState([]));
    expect(result.current.checked).toEqual({});
  });

  it('should toggle checkbox state', () => {
    const {result} = renderHook(() => useCheckboxState([]));

    act(() => {
      result.current.toggleCheckbox('item1');
    });

    expect(result.current.checked['item1']).toBe(true);

    act(() => {
      result.current.toggleCheckbox('item1');
    });

    expect(result.current.checked['item1']).toBe(false);
  });

  it('should handle multiple items', () => {
    const {result} = renderHook(() => useCheckboxState([]));

    act(() => {
      result.current.toggleCheckbox('item1');
      result.current.toggleCheckbox('item2');
    });

    expect(result.current.checked['item1']).toBe(true);
    expect(result.current.checked['item2']).toBe(true);
  });

  it('should clear all checked items', () => {
    const {result} = renderHook(() => useCheckboxState([]));

    act(() => {
      result.current.toggleCheckbox('item1');
      result.current.toggleCheckbox('item2');
    });

    act(() => {
      result.current.clearChecked();
    });

    expect(result.current.checked).toEqual({});
  });
});
