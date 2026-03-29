import { useParams } from 'react-router-dom';
import { Container, Box, Alert, Typography, CircularProgress } from '@mui/material';
import { ItemView } from 'src/components/items/ItemView';
import { useFetchItems } from 'src/hooks/useFetchItems';
import { fetchListById } from 'src/api/lists';
import { useState, useEffect } from 'react';
import type { List } from 'src/api/lists';

export const ListDetailPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const { items, error, refetch } = useFetchItems(listId || '');
  const [list, setList] = useState<List | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string>('');

  useEffect(() => {
    if (!listId) return;

    const loadList = async () => {
      try {
        const data = await fetchListById(listId);
        setList(data);
      } catch (err) {
        setListError('Failed to load list');
        console.error(err);
      } finally {
        setListLoading(false);
      }
    };

    loadList();
  }, [listId]);

  if (!listId) {
    return (
      <Container component="main" sx={{ py: 4 }}>
        <Alert severity="error">List ID not found</Alert>
      </Container>
    );
  }

  if (listLoading) {
    return (
      <Container component="main" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!list) {
    return (
      <Container component="main" sx={{ py: 4 }}>
        <Alert severity="error">{listError || 'List not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container
      component="main"
      sx={{
        py: 4,
        flex: 1,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ color: list.color }}>
          {list.icon} {list.name}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <ItemView
        listId={listId}
        items={items}
        fieldConfig={list.fieldConfig}
        onItemsChange={refetch}
      />
    </Container>
  );
};
