import type {List} from 'src/api/lists';

import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {fetchLists} from 'src/api/lists';
import {useApiErrorHandler} from 'src/hooks/useApiErrorHandler';

interface UseFetchListsReturn {
  error: null | string;
  lists: List[];
  loading: boolean;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch lists from the backend API
 */
export const useFetchLists = (): UseFetchListsReturn => {
  const {t} = useTranslation();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const {handleError} = useApiErrorHandler();

  const fetchListsData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchLists();
      setLists(data);
    } catch (err) {
      const {errorMessage} = handleError(err, t('errors.fetchListsFailed'));
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [handleError, t]);

  useEffect(() => {
    fetchListsData();
  }, [fetchListsData]);

  return {error, lists, loading, refetch: fetchListsData};
};
