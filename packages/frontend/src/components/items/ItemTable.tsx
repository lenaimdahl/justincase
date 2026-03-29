import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Item } from 'src/types/item';
import { useItemOperations } from 'src/hooks/useItemOperations';

interface ItemTableProps {
  listId: string;
  items: Item[];
  loading?: boolean;
  onItemsChange: () => Promise<void>;
}

export const ItemTable = ({
  listId,
  items,
  loading = false,
  onItemsChange,
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

  // Initialize editing state when items change
  useEffect(() => {
    initializeEditingState(items);
  }, [items, initializeEditingState]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {createError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {createError}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Expiry Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Comment</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const state = editingState[item._id] || item;
              const isSaving = state.isSaving;
              const hasError = !!state.error;

              return (
                <TableRow
                  key={item._id}
                  sx={{
                    opacity: isSaving ? 0.6 : 1,
                    backgroundColor: hasError ? '#ffebee' : 'transparent',
                  }}
                >
                  <TableCell>
                    <TextField
                      size="small"
                      value={state.name || ''}
                      onChange={(e) =>
                        updateField(item._id, 'name', e.target.value)
                      }
                      disabled={isSaving}
                      fullWidth
                      error={hasError}
                      sx={{ maxWidth: 200 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleAdjustQuantity(item._id, -1)}
                        disabled={isSaving || state.quantity <= 0}
                        title="Decrease quantity"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Box sx={{ minWidth: 40, textAlign: 'center' }}>
                        {state.quantity}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleAdjustQuantity(item._id, 1)}
                        disabled={isSaving}
                        title="Increase quantity"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={state.unit || ''}
                      onChange={(e) =>
                        updateField(item._id, 'unit', e.target.value)
                      }
                      placeholder="kg, liters, pcs"
                      disabled={isSaving}
                      error={hasError}
                      sx={{ maxWidth: 120 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="date"
                      value={state.expiryDate || ''}
                      onChange={(e) =>
                        updateField(item._id, 'expiryDate', e.target.value)
                      }
                      disabled={isSaving}
                      error={hasError}
                      InputLabelProps={{ shrink: true }}
                      sx={{ maxWidth: 150 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={state.comment || ''}
                      onChange={(e) =>
                        updateField(item._id, 'comment', e.target.value)
                      }
                      placeholder="Optional note"
                      disabled={isSaving}
                      error={hasError}
                      sx={{ maxWidth: 150 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteItem(item._id)}
                      disabled={isSaving}
                      color="error"
                      title="Delete item"
                    >
                      {isSaving ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteIcon fontSize="small" />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* New item row */}
            <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="New item name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  disabled={creatingItem}
                  fullWidth
                  sx={{ maxWidth: 200 }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  size="small"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  disabled={creatingItem}
                  inputProps={{ min: 0 }}
                  sx={{ maxWidth: 80 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="kg, liters, pcs"
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unit: e.target.value })
                  }
                  disabled={creatingItem}
                  sx={{ maxWidth: 120 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, expiryDate: e.target.value })
                  }
                  disabled={creatingItem}
                  InputLabelProps={{ shrink: true }}
                  sx={{ maxWidth: 150 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Optional note"
                  value={newItem.comment}
                  onChange={(e) =>
                    setNewItem({ ...newItem, comment: e.target.value })
                  }
                  disabled={creatingItem}
                  sx={{ maxWidth: 150 }}
                />
              </TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  onClick={handleCreateItem}
                  disabled={creatingItem || !newItem.name.trim()}
                  color="primary"
                  title="Add item"
                >
                  {creatingItem ? (
                    <CircularProgress size={20} />
                  ) : (
                    <AddIcon fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
