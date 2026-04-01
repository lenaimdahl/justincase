import {useParams} from 'react-router-dom';
import {Container, Box, Alert, CircularProgress} from '@mui/material';
import {ListHeader} from 'src/components/lists/ListHeader';
import {ItemView} from 'src/components/items/ItemView';
import {useFetchItems} from 'src/hooks/useFetchItems';
import {fetchListById} from 'src/api/lists';
import {useApiErrorHandler} from 'src/hooks/useApiErrorHandler';
import {useState, useEffect} from 'react';
import type {List} from 'src/api/lists';

export const ListDetailPage = () => {
  const {listId} = useParams<{listId: string}>();
  const {items, error, refetch} = useFetchItems(listId || '');
  const [list, setList] = useState<List | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string>('');
  const {handleError} = useApiErrorHandler();

  useEffect(() => {
    if (!listId) return;

    const loadList = async () => {
      try {
        const data = await fetchListById(listId);
        setList(data);
      } catch (err) {
        const {errorMessage} = handleError(err, 'Failed to load list');
        setListError(errorMessage);
      } finally {
        setListLoading(false);
      }
    };

    loadList();
  }, [listId, handleError]);

  if (!listId) {
    return (
      <Container component="main" sx={{py: {xs: 2, sm: 4}}}>
        <Alert severity="error">List ID not found</Alert>
      </Container>
    );
  }

  if (listLoading) {
    return (
      <Container component="main" sx={{py: {xs: 2, sm: 4}}}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!list) {
    return (
      <Container component="main" sx={{py: {xs: 2, sm: 4}}}>
        <Alert severity="error">{listError || 'List not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        py: {xs: 2, sm: 4},
        flex: 1,
        px: {xs: 1, sm: 2},
      }}
    >
      <ListHeader list={list} />

      {error && (
        <Alert severity="error" sx={{mb: 3}}>
          {error}
        </Alert>
      )}

      <ItemView listId={listId} items={items} fieldConfig={list.fieldConfig} onItemsChange={refetch} />
    </Container>
  );
};
