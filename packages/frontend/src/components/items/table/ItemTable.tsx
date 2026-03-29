import {useEffect} from 'react';
import {Table, TableBody, TableContainer, TableHead, Paper, CircularProgress, Box, Alert} from '@mui/material';
import type {Item} from 'src/types/item';
import {useItemOperations} from 'src/hooks/useItemOperations';
import {ItemTableHeader} from 'src/components/items/table/ItemTableHeader';
import {ItemTableRow} from 'src/components/items/table/ItemTableRow';
import {ItemTableNewItemRow} from 'src/components/items/table/ItemTableNewItemRow';

interface ItemTableProps {
  listId: string;
  items: Item[];
  loading?: boolean;
  onItemsChange: () => Promise<void>;
}

export const ItemTable = ({listId, items, loading = false, onItemsChange}: ItemTableProps) => {
  const {
    editingState,
    newItem,
    creatingItem,
    createError,
    setNewItem,
    updateField,
    handleAdjustQuantity,
    handleDeleteItem,
    handleCreateItem,
    initializeEditingState,
  } = useItemOperations(listId, onItemsChange);

  useEffect(() => {
    initializeEditingState(items);
  }, [items, initializeEditingState]);

  if (loading) {
    return (
      <Box sx={{display: 'flex', justifyContent: 'center', py: 4}}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{width: '100%'}}>
      {createError && (
        <Alert severity="error" sx={{mb: 2}}>
          {createError}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{mb: 3}}>
        <Table>
          <TableHead>
            <ItemTableHeader />
          </TableHead>
          <TableBody>
            {items.map(item => {
              const state = editingState[item._id] || item;

              return (
                <ItemTableRow
                  key={item._id}
                  item={item}
                  state={state}
                  onAdjustQuantity={handleAdjustQuantity}
                  onUpdateField={updateField}
                  onDelete={handleDeleteItem}
                />
              );
            })}

            <ItemTableNewItemRow
              newItem={newItem}
              creatingItem={creatingItem}
              onItemChange={setNewItem}
              onSubmit={handleCreateItem}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
