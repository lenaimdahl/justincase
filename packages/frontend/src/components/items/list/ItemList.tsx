import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, {useState, useEffect} from 'react';
import type {Item} from 'src/types/item';
import {useItemOperations} from 'src/hooks/useItemOperations';
import {useCheckboxState} from 'src/hooks/useCheckboxState';

interface ItemListProps {
  listId: string;
  items: Item[];
  onItemsChange: () => Promise<void>;
  checkboxOptions?: string[]; // For multiple checkboxes mode
  requiresExpiryDate?: boolean; // For simple checklist mode
}

/**
 * Unified component for displaying items as either:
 * 1. Simple checklist with single checkboxes
 * 2. Multi-option checklist with multiple categorized checkboxes
 */
export const ItemList = ({
  listId,
  items,
  onItemsChange,
  checkboxOptions,
  requiresExpiryDate = false,
}: ItemListProps) => {
  const {editingState, newItem, creatingItem, createError, setNewItem, handleDeleteItem, handleCreateItem} =
    useItemOperations(listId, onItemsChange);

  const isMultipleCheckboxMode = checkboxOptions && checkboxOptions.length > 0;
  const {checkedItems, handleCheck} = useCheckboxState();

  // For multiple checkbox mode: track state per option
  const [checkedByOption, setCheckedByOption] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    if (isMultipleCheckboxMode) {
      const state: Record<string, Set<string>> = {};
      checkboxOptions?.forEach(option => {
        state[option] = new Set();
      });
      setCheckedByOption(state);
    }
  }, [items, checkboxOptions, isMultipleCheckboxMode]);

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
    setNewItem({name: '', expiryDate: '', quantity: 1, unit: '', comment: ''});
  };

  if (isMultipleCheckboxMode) {
    // Render multiple checkbox list
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
              {items.map(item => {
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

            {items.length === 0 && (
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
  } else {
    // Render simple checklist
    return (
      <Box sx={{maxWidth: 600, mx: 'auto', p: 2}}>
        {createError && (
          <Alert severity="error" sx={{mb: 2}}>
            {createError}
          </Alert>
        )}

        <Card sx={{mb: 2}}>
          <CardContent>
            <List sx={{p: 0}}>
              {items.map(item => {
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
                    <Box sx={{flex: 1, cursor: 'pointer'}} onClick={() => handleCheck(item._id)}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheck(item._id)}
                        disabled={state.isSaving}
                        style={{marginRight: 12}}
                      />
                      <ListItemText
                        primary={state.name}
                        secondary={requiresExpiryDate && state.expiryDate ? `📅 ${state.expiryDate}` : undefined}
                        sx={{display: 'inline', ml: 1}}
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

            {items.length === 0 && (
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
        <Card sx={{p: 2}}>
          <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'flex-end'}}>
            <TextField
              size="small"
              placeholder="Item name..."
              value={newItem.name || ''}
              onChange={e => setNewItem({...newItem, name: e.target.value})}
              disabled={creatingItem}
              sx={{flex: 1, minWidth: 200}}
            />
            <TextField
              size="small"
              type="number"
              placeholder="Menge"
              value={newItem.quantity || 1}
              onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
              disabled={creatingItem}
              slotProps={{htmlInput: {min: 1}}}
              sx={{width: 120}}
            />
            {requiresExpiryDate && (
              <TextField
                size="small"
                type="date"
                value={newItem.expiryDate || ''}
                onChange={e => setNewItem({...newItem, expiryDate: e.target.value})}
                disabled={creatingItem}
                InputLabelProps={{shrink: true}}
                sx={{width: 180}}
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
  }
};
