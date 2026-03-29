import {useState, useEffect} from 'react';

interface List {
  id: string;
  name: string;
  itemCount: number;
}

interface UseFetchListsReturn {
  lists: List[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch lists from the backend API
 * TODO: Connect to real backend after issue #5 (Lists API) is complete
 */
export const useFetchLists = (): UseFetchListsReturn => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/lists');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch lists');
      // }
      // const data = await response.json();
      // setLists(data);

      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 500));
      setLists([
        {id: '1', name: 'Kitchen', itemCount: 5},
        {id: '2', name: 'Bathroom', itemCount: 3},
        {id: '3', name: 'Bedroom', itemCount: 8},
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return {lists, loading, error, refetch: fetchLists};
};
