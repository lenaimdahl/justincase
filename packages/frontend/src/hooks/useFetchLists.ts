import {useState, useEffect} from 'react';
import type {List} from 'src/api/lists';
import {fetchLists} from 'src/api/lists';

interface UseFetchListsReturn {
  lists: List[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch lists from the backend API
 */
export const useFetchLists = (): UseFetchListsReturn => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListsData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchLists();
      setLists(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListsData();
  }, []);

  return {lists, loading, error, refetch: fetchListsData};
};
