import {Box, Button, Card, CardContent, IconButton, List, TextField, CircularProgress, Alert} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect} from 'react';
import type {Item} from 'src/types/item';
import {useItemOperations} from 'src/hooks/useItemOperations';

interface CheckboxListProps {
  listId: string;
  items: Item[];
  checkboxOptions: string[];
  onItemsChange: () => Promise<void>;
}

export const CheckboxList = ({listId, items, checkboxOptions, onItemsChange}: CheckboxListProps) => {
  const {editingState, newItem, creatingItem, createError, setNewItem, handleDeleteItem, handleCreateItem} =
    useItemOperations(listId, onItemsChange);

  const [checkedByOption, setCheckedByOption] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    // Initialize checkbox state from items
    const state: Record<string, Set<string>> = {};
    checkboxOptions.forEach(option => {
      state[option] = new Set();
    });
    setCheckedByOption(state);
  }, [items, checkboxOptions]);

  const handleCheckOption = (itemId: string, option: string) => {
    const newState = {...checkedByOption};
    if (!newState[option]) {
      newState[option] = new Set();
    }
    if (newState[option].has(itemId)) {
      newState[option].delete(itemId);
    } else {
      newState[option].add(itemId);
    }
    setCheckedByOption(newState);
  };

  const handleAddItem = async () => {
    await handleCreateItem();
    setNewItem({name: '', quantity: 1, expiryDate: '', unit: '', comment: ''});
  };

  const displayItems = items;

  return (
    <Box sx={{maxWidth: 800, mx: 'auto', p: 2}}>
      {createError && (
        <Alert severity="error" sx={{mb: 2}}>
          {createError}
        </Alert>
      )}

      <Card sx={{mb: 2}}>
        <CardContent>
          {/* Checkbox headers */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `1fr ${checkboxOptions.length * 120}px 50px`,
              gap: 1,
              mb: 2,
              pb: 1,
              borderBottom: '2px solid #eee',
              fontWeight: 'bold',
            }}
          >
            <Box>Name</Box>
            {checkboxOptions.map(option => (
              <Box key={option} sx={{textAlign: 'center', fontSize: '0.9em'}}>
                {option}
              </Box>
            ))}
            <Box />
          </Box>

          <List sx={{p: 0}}>
            {displayItems.map(item => {
              const state = editingState[item._id] || item;

              return (
                <Box
                  key={item._id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: `1fr ${checkboxOptions.length * 120}px 50px`,
                    gap: 1,
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid #eee',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Box sx={{opacity: state.isSaving ? 0.6 : 1}}>{state.name}</Box>
                  {checkboxOptions.map(option => (
                    <Box key={option} sx={{textAlign: 'center'}}>
                      <input
                        type="checkbox"
                        checked={checkedByOption[option]?.has(item._id) ?? false}
                        onChange={() => handleCheckOption(item._id, option)}
                        disabled={state.isSaving}
                      />
                    </Box>
                  ))}
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteItem(item._id)}
                    disabled={state.isSaving}
                    color="error"
                    title="Delete item"
                  >
                    {state.isSaving ? <CircularProgress size={20} /> : <DeleteIcon fontSize="small" />}
                  </IconButton>
                </Box>
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
              Keine Einträge. Erstelle einen!
            </Box>
          )}
        </CardContent>
      </Card>

      {/* New item input */}
      <Card sx={{p: 2}}>
        <Box sx={{display: 'flex', gap: 1, alignItems: 'flex-end'}}>
          <TextField
            size="small"
            placeholder="Name (z.B. Gast, Aufgabe)..."
            value={newItem.name || ''}
            onChange={e => setNewItem({...newItem, name: e.target.value})}
            disabled={creatingItem}
            sx={{flex: 1, minWidth: 200}}
          />
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
