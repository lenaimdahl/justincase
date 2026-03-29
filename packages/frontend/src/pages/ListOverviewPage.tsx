import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import { ListOverviewHeader } from 'src/components/lists/ListOverviewHeader';
import { ListsGrid } from 'src/components/lists/ListsGrid';
import { EmptyListsState } from 'src/components/lists/EmptyListsState';
import { ListConfigurator } from 'src/components/lists/ListConfigurator';
import { useFetchLists } from 'src/hooks/useFetchLists';
import { createList } from 'src/api/lists';
import type { FieldConfig } from 'src/api/lists';

export const ListOverviewPage = () => {
  const navigate = useNavigate();
  const { lists, loading, error, refetch } = useFetchLists();
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const [creatingList, setCreatingList] = useState(false);

  const handleOpenConfigurator = () => {
    setOpenConfigurator(true);
  };

  const handleCloseConfigurator = () => {
    setOpenConfigurator(false);
  };

  const handleCreateList = async (name: string, icon: string, color: string, fieldConfig: FieldConfig) => {
    setCreatingList(true);

    try {
      await createList({ 
        name,
        icon,
        color,
        fieldConfig,
      });
      handleCloseConfigurator();
      await refetch();
    } catch (err) {
      console.error('Failed to create list:', err);
    } finally {
      setCreatingList(false);
    }
  };

  const handleListCardClick = (listId: string) => {
    navigate(`/lists/${listId}`);
  };

  return (
    <Container
      component="main"
      sx={{
        py: 4,
        flex: 1,
      }}
    >
      <ListOverviewHeader onCreateClick={handleOpenConfigurator} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && lists.length === 0 && !error && <EmptyListsState />}

      {!loading && lists.length > 0 && (
        <ListsGrid lists={lists} onListClick={handleListCardClick} />
      )}

      <ListConfigurator
        open={openConfigurator}
        onClose={handleCloseConfigurator}
        onSubmit={handleCreateList}
        loading={creatingList}
      />
    </Container>
  );
};
