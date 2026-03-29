import {useState, useCallback} from 'react';

/**
 * Custom hook to manage checkbox state across components
 * Handles single and multiple checkbox tracking
 */
export const useCheckboxState = (initialItems?: string[]) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set(initialItems));

  const handleCheck = useCallback((itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId);
      return newSet;
    });
  }, []);

  const handleToggleAll = useCallback((itemIds: string[]) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      const allChecked = itemIds.every(id => newSet.has(id));

      if (allChecked) {
        itemIds.forEach(id => newSet.delete(id));
      } else {
        itemIds.forEach(id => newSet.add(id));
      }
      return newSet;
    });
  }, []);

  const reset = useCallback(() => {
    setCheckedItems(new Set());
  }, []);

  return {checkedItems, handleCheck, handleToggleAll, reset};
};
