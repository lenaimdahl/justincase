import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Box, CircularProgress, Alert} from '@mui/material';
import {ListOverviewHeader} from 'src/components/lists/ListOverviewHeader';
import {ListsGrid} from 'src/components/lists/ListsGrid';
import {EmptyListsState} from 'src/components/lists/EmptyListsState';
import {CreateListDialog} from 'src/components/lists/CreateListDialog';
import {useFetchLists} from 'src/hooks/useFetchLists';

export const ListOverviewPage = () => {
  const navigate = useNavigate();
  const {lists, loading, error, refetch} = useFetchLists();
  const [openDialog, setOpenDialog] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewListName('');
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      return;
    }

    // TODO: Connect to backend API
    // const response = await fetch('/api/lists', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: newListName }),
    // });

    console.log('Creating list:', newListName);
    handleCloseDialog();
    refetch();
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
      <ListOverviewHeader onCreateClick={handleOpenDialog} />

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

      <CreateListDialog
        open={openDialog}
        value={newListName}
        onChange={setNewListName}
        onClose={handleCloseDialog}
        onSubmit={handleCreateList}
      />
    </Container>
  );
};
