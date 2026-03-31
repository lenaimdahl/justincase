import {useState, useEffect, useCallback} from 'react';
import type {Item} from 'src/types/item';
import {fetchItemsByListId} from 'src/api/items';
import {useApiErrorHandler} from 'src/hooks/useApiErrorHandler';

interface UseFetchItemsReturn {
  items: Item[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch items for a given list from the backend API
 */
export const useFetchItems = (listId: string): UseFetchItemsReturn => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {handleError} = useApiErrorHandler();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchItemsByListId(listId);
      setItems(data);
    } catch (err) {
      const {errorMessage} = handleError(err, 'Failed to fetch items');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [listId, handleError]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {items, loading, error, refetch: fetchItems};
};
