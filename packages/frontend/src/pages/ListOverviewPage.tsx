import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Box, CircularProgress, Alert} from '@mui/material';
import {ListOverviewHeader} from 'src/components/lists/display/ListOverviewHeader';
import {ListsGrid} from 'src/components/lists/display/ListsGrid';
import {EmptyListsState} from 'src/components/lists/display/EmptyListsState';
import {ListConfigurator} from 'src/components/lists/configurators/ListConfigurator';
import {useFetchLists} from 'src/hooks/useFetchLists';
import {useNotification} from 'src/hooks/useNotification';
import {useApiErrorHandler} from 'src/hooks/useApiErrorHandler';
import {createList} from 'src/api/lists';
import type {FieldConfig} from 'src/api/lists';

export const ListOverviewPage = () => {
  const navigate = useNavigate();
  const {lists, loading, error} = useFetchLists();
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const [creatingList, setCreatingList] = useState(false);
  const notification = useNotification();
  const {handleError} = useApiErrorHandler();

  const handleOpenConfigurator = () => {
    setOpenConfigurator(true);
  };

  const handleCloseConfigurator = () => {
    setOpenConfigurator(false);
  };

  const handleCreateList = async (name: string, icon: string, color: string, fieldConfig: FieldConfig) => {
    setCreatingList(true);

    try {
      const newList = await createList({
        name,
        icon,
        color,
        fieldConfig,
      });
      handleCloseConfigurator();
      notification.success(`List "${name}" created successfully`);
      // Navigate to the new list detail page
      navigate(`/lists/${newList.id}`);
    } catch (err) {
      handleError(err, 'Failed to create list');
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
      maxWidth="xl"
      sx={{
        py: {xs: 2, sm: 4},
        flex: 1,
        px: {xs: 1, sm: 2},
      }}
    >
      <ListOverviewHeader onCreateClick={handleOpenConfigurator} />

      {error && (
        <Alert severity="error" sx={{mb: 3}}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{display: 'flex', justifyContent: 'center', py: 6}}>
          <CircularProgress />
        </Box>
      )}

      {!loading && lists.length === 0 && !error && <EmptyListsState />}

      {!loading && lists.length > 0 && <ListsGrid lists={lists} onListClick={handleListCardClick} />}

      <ListConfigurator
        open={openConfigurator}
        onClose={handleCloseConfigurator}
        onSubmit={handleCreateList}
        loading={creatingList}
      />
    </Container>
  );
};
