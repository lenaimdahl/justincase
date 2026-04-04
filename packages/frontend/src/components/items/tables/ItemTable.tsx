import {useEffect} from 'react';
import {Table, TableBody, TableContainer, TableHead, Paper, CircularProgress, Box, Alert} from '@mui/material';
import type {Item} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {useItemOperations} from 'src/hooks/useItemOperations';
import {ItemTableHeader} from 'src/components/items/tables/header/ItemTableHeader';
import {ItemTableRow} from 'src/components/items/tables/rows/ItemTableRow';
import {ItemTableNewItemRow} from 'src/components/items/tables/new-row/ItemTableNewItemRow';

interface ItemTableProps {
  listId: string;
  items: Item[];
  fieldConfig?: FieldConfig;
  loading?: boolean;
  onItemsChange: () => Promise<void>;
  readOnly?: boolean;
}

export const ItemTable = ({
  listId,
  items,
  fieldConfig,
  loading = false,
  onItemsChange,
  readOnly = false,
}: ItemTableProps) => {
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

      <TableContainer
        component={Paper}
        sx={{
          mb: 3,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: 4,
            '&:hover': {
              background: '#555',
            },
          },
        }}
      >
        <Table sx={{minWidth: {xs: 600, sm: 700}}}>
          <TableHead>
            <ItemTableHeader fieldConfig={fieldConfig} />
          </TableHead>
          <TableBody>
            {items.map(item => {
              const state = editingState[item._id] || item;

              return (
                <ItemTableRow
                  key={item._id}
                  item={item}
                  state={state}
                  fieldConfig={fieldConfig}
                  onAdjustQuantity={readOnly ? async () => {} : handleAdjustQuantity}
                  onUpdateField={readOnly ? () => {} : updateField}
                  onDelete={readOnly ? async () => {} : handleDeleteItem}
                />
              );
            })}

            {!readOnly && (
              <ItemTableNewItemRow
                newItem={newItem}
                creatingItem={creatingItem}
                fieldConfig={fieldConfig}
                onItemChange={setNewItem}
                onSubmit={handleCreateItem}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
