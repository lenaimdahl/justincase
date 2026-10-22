import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Container, Box, CircularProgress, Alert} from '@mui/material';
import {ListOverviewHeader} from 'src/components/lists/overview/ListOverviewHeader';
import {ListsGrid} from 'src/components/lists/overview/ListsGrid';
import {EmptyListsState} from 'src/components/lists/overview/EmptyListsState';
import {ListConfigurator} from 'src/components/lists/configurators/ListConfigurator';
import {EditListDialog} from 'src/components/lists/dialogs/EditListDialog';
import {DeleteListDialog} from 'src/components/lists/dialogs/DeleteListDialog';
import {useFetchLists} from 'src/hooks/useFetchLists';
import {useNotification} from 'src/hooks/useNotification';
import {useApiErrorHandler} from 'src/hooks/useApiErrorHandler';
import {createList, updateList, deleteList} from 'src/api/lists';
import type {FieldConfig, List} from 'src/api/lists';

export const ListOverviewPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {lists, loading, error, refetch} = useFetchLists();
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const [creatingList, setCreatingList] = useState(false);
  const [editingList, setEditingList] = useState<List | null>(null);
  const [updatingList, setUpdatingList] = useState(false);
  const [deletingList, setDeletingList] = useState<List | null>(null);
  const [removingList, setRemovingList] = useState(false);
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
      notification.success(t('notifications.listCreated', {name}));
      navigate(`/lists/${newList.id}`);
    } catch (err) {
      handleError(err, t('errors.createListFailed'));
    } finally {
      setCreatingList(false);
    }
  };

  const handleListCardClick = (listId: string) => {
    navigate(`/lists/${listId}`);
  };

  const handleEditList = (list: List) => {
    setEditingList(list);
  };

  const handleCloseEditDialog = () => {
    setEditingList(null);
  };

  const handleUpdateList = async (name: string, icon: string, color: string) => {
    if (!editingList) return;
    setUpdatingList(true);

    try {
      await updateList(editingList.id, {name, icon, color});
      notification.success(t('notifications.listUpdated', {name}));
      handleCloseEditDialog();
      await refetch();
    } catch (err) {
      handleError(err, t('errors.updateListFailed'));
    } finally {
      setUpdatingList(false);
    }
  };

  const handleDeleteList = (list: List) => {
    setDeletingList(list);
  };

  const handleCloseDeleteDialog = () => {
    setDeletingList(null);
  };

  const handleConfirmDeleteList = async () => {
    if (!deletingList) return;
    setRemovingList(true);

    try {
      await deleteList(deletingList.id);
      notification.success(t('notifications.listDeleted', {name: deletingList.name}));
      handleCloseDeleteDialog();
      await refetch();
    } catch (err) {
      handleError(err, t('errors.deleteListFailed'));
    } finally {
      setRemovingList(false);
    }
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

      {!loading && lists.length > 0 && (
        <ListsGrid
          lists={lists}
          onListClick={handleListCardClick}
          onEditList={handleEditList}
          onDeleteList={handleDeleteList}
        />
      )}

      <ListConfigurator
        open={openConfigurator}
        onClose={handleCloseConfigurator}
        onSubmit={handleCreateList}
        loading={creatingList}
      />

      <EditListDialog
        open={!!editingList}
        list={editingList}
        onClose={handleCloseEditDialog}
        onSubmit={handleUpdateList}
        loading={updatingList}
      />

      <DeleteListDialog
        open={!!deletingList}
        list={deletingList}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDeleteList}
        loading={removingList}
      />
    </Container>
  );
};
