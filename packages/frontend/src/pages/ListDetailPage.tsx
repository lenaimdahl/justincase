import { useParams } from 'react-router-dom';
import { Container, Box,  Alert, Typography } from '@mui/material';
import { ItemTable } from 'src/components/items/ItemTable';
import { useFetchItems } from 'src/hooks/useFetchItems';

export const ListDetailPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const { items, loading, error, refetch } = useFetchItems(listId || '');

  if (!listId) {
    return (
      <Container component="main" sx={{ py: 4 }}>
        <Alert severity="error">List ID not found</Alert>
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
        <Typography variant="h4" component="h1" sx={{ color: '#6a1b9a' }}>
          Items in List
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <ItemTable
        listId={listId}
        items={items}
        loading={loading}
        onItemsChange={refetch}
      />
    </Container>
  );
};
