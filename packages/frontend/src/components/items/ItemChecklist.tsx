import { Box, Button, Card, CardContent, IconButton, List, ListItem, ListItemText, TextField, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import type { Item } from 'src/types/item';
import { useItemOperations } from 'src/hooks/useItemOperations';

interface ItemChecklistProps {
  listId: string;
  items: Item[];
  requiresExpiryDate: boolean;
  onItemsChange: () => Promise<void>;
}

export const ItemChecklist = ({
  listId,
  items,
  requiresExpiryDate,
  onItemsChange,
}: ItemChecklistProps) => {
  const {
    editingState,
    newItem,
    creatingItem,
    createError,
    setNewItem,
    handleDeleteItem,
    handleCreateItem,
  } = useItemOperations(listId, onItemsChange);

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Reset checked items when items change
    setCheckedItems(new Set());
  }, [items]);

  const handleCheck = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const handleAddItem = async () => {
    await handleCreateItem();
    setNewItem({ name: '', expiryDate: '', quantity: 1, unit: '', comment: '' });
  };

  // Display all items
  const displayItems = items;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      {createError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {createError}
        </Alert>
      )}

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <List sx={{ p: 0 }}>
            {displayItems.map((item) => {
              const state = editingState[item._id] || item;
              const isChecked = checkedItems.has(item._id);

              return (
                <ListItem
                  key={item._id}
                  sx={{
                    opacity: state.isSaving ? 0.6 : 1,
                    backgroundColor: isChecked ? '#f5f5f5' : 'transparent',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    color: isChecked ? '#999' : 'auto',
                    py: 1,
                    px: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #eee',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => handleCheck(item._id)}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheck(item._id)}
                      disabled={state.isSaving}
                      style={{ marginRight: 12 }}
                    />
                    <ListItemText
                      primary={state.name}
                      secondary={
                        requiresExpiryDate && state.expiryDate ? `📅 ${state.expiryDate}` : undefined
                      }
                      sx={{ display: 'inline', ml: 1 }}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteItem(item._id)}
                    disabled={state.isSaving}
                    color="error"
                    title="Delete item"
                  >
                    {state.isSaving ? <CircularProgress size={20} /> : <DeleteIcon fontSize="small" />}
                  </IconButton>
                </ListItem>
              );
            })}
          </List>

          {displayItems.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: '#999',
              }}
            >
              Keine Items yet. Erstelle eines!
            </Box>
          )}
        </CardContent>
      </Card>

      {/* New item input */}
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            size="small"
            placeholder="Item name..."
            value={newItem.name || ''}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            disabled={creatingItem}
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            size="small"
            type="number"
            placeholder="Menge"
            value={newItem.quantity || 1}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
            disabled={creatingItem}
            inputProps={{ min: 1 }}
            sx={{ width: 120 }}
          />
          {requiresExpiryDate && (
            <TextField
              size="small"
              type="date"
              value={newItem.expiryDate || ''}
              onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
              disabled={creatingItem}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 180 }}
            />
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            disabled={!newItem.name?.trim() || creatingItem}
            sx={{
              background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
              },
              whiteSpace: 'nowrap',
            }}
          >
            Hinzufügen
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
