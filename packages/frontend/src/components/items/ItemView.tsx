import { Box, Button, Card, CardContent, IconButton, List, ListItem, TextField, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import type { Item } from 'src/types/item';
import type { FieldConfig } from 'src/types/list';
import { useItemOperations } from 'src/hooks/useItemOperations';

interface ItemViewProps {
  listId: string;
  items: Item[];
  fieldConfig: FieldConfig;
  onItemsChange: () => Promise<void>;
}

export const ItemView = ({
  listId,
  items,
  fieldConfig,
  onItemsChange,
}: ItemViewProps) => {
  const {
    editingState,
    newItem,
    creatingItem,
    createError,
    setNewItem,
    handleDeleteItem,
    handleCreateItem,
  } = useItemOperations(listId, onItemsChange);

  const [checkedItems, setCheckedItems] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    // Initialize checkbox states
    const state: Record<string, Set<string>> = {};
    if (fieldConfig.multipleCheckboxes && fieldConfig.checkboxLabels) {
      fieldConfig.checkboxLabels.forEach((label) => {
        state[label] = new Set();
      });
    }
    setCheckedItems(state);
  }, [fieldConfig]);

  const handleCheck = (itemId: string) => {
    const newChecked = new Set(checkedItems['simple'] || new Set());
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems({ ...checkedItems, simple: newChecked });
  };

  const handleCheckMultiple = (itemId: string, label: string) => {
    const newState = { ...checkedItems };
    if (!newState[label]) {
      newState[label] = new Set();
    }
    if (newState[label].has(itemId)) {
      newState[label].delete(itemId);
    } else {
      newState[label].add(itemId);
    }
    setCheckedItems(newState);
  };

  const handleAddItem = async () => {
    await handleCreateItem();
    setNewItem({
      name: '',
      quantity: 1,
      expiryDate: '',
      unit: '',
      comment: '',
    });
  };

  const displayItems = items;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {createError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {createError}
        </Alert>
      )}

      {/* Items List */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          {fieldConfig.multipleCheckboxes && fieldConfig.checkboxLabels && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `1fr ${(fieldConfig.checkboxLabels.length || 0) * 120}px 50px`,
                gap: 1,
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #eee',
                fontWeight: 'bold',
              }}
            >
              <Box>Name</Box>
              {fieldConfig.checkboxLabels.map((label) => (
                <Box key={label} sx={{ textAlign: 'center', fontSize: '0.9em' }}>
                  {label}
                </Box>
              ))}
              <Box />
            </Box>
          )}

          <List sx={{ p: 0 }}>
            {displayItems.map((item) => {
              const state = editingState[item._id] || item;
              const isChecked = checkedItems['simple']?.has(item._id) ?? false;

              return (
                <ListItem
                  key={item._id}
                  sx={{
                    opacity: state.isSaving ? 0.6 : 1,
                    backgroundColor: isChecked && fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes ? '#f5f5f5' : 'transparent',
                    textDecoration: isChecked && fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes ? 'line-through' : 'none',
                    color: isChecked && fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes ? '#999' : 'auto',
                    py: 1,
                    px: 0,
                    display: fieldConfig.multipleCheckboxes
                      ? 'grid'
                      : 'flex',
                    gridTemplateColumns: fieldConfig.multipleCheckboxes
                      ? `1fr ${(fieldConfig.checkboxLabels?.length || 0) * 120}px 50px`
                      : undefined,
                    justifyContent: fieldConfig.multipleCheckboxes ? undefined : 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #eee',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  {/* Item Name (+ checkbox if single) */}
                  <Box
                    sx={{
                      flex: fieldConfig.multipleCheckboxes ? undefined : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes ? 'pointer' : 'default',
                    }}
                    onClick={() => {
                      if (fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes) {
                        handleCheck(item._id);
                      }
                    }}
                  >
                    {fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes && (
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheck(item._id)}
                        disabled={state.isSaving}
                        style={{ marginRight: 8 }}
                      />
                    )}
                    <Box>
                      <div>{state.name}</div>
                      {fieldConfig.hasQuantity && state.quantity && <small>Menge: {state.quantity}</small>}
                      {fieldConfig.hasExpiryDate && state.expiryDate && <small>📅 {state.expiryDate}</small>}
                      {fieldConfig.hasNotes && state.comment && <small>📝 {state.comment}</small>}
                    </Box>
                  </Box>

                  {/* Multiple Checkboxes */}
                  {fieldConfig.multipleCheckboxes &&
                    fieldConfig.checkboxLabels?.map((label) => (
                      <Box key={label} sx={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={checkedItems[label]?.has(item._id) ?? false}
                          onChange={() => handleCheckMultiple(item._id, label)}
                          disabled={state.isSaving}
                        />
                      </Box>
                    ))}

                  {/* Delete Button */}
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
              Keine Items. Erstelle eines!
            </Box>
          )}
        </CardContent>
      </Card>

      {/* New Item Form */}
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Item name..."
            value={newItem.name || ''}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            disabled={creatingItem}
            fullWidth
          />

          {fieldConfig.hasQuantity && (
            <TextField
              size="small"
              type="number"
              placeholder="Menge"
              value={newItem.quantity || 1}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
              disabled={creatingItem}
              inputProps={{ min: 1 }}
            />
          )}

          {fieldConfig.hasExpiryDate && (
            <TextField
              size="small"
              type="date"
              value={newItem.expiryDate || ''}
              onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
              disabled={creatingItem}
              InputLabelProps={{ shrink: true }}
            />
          )}

          {fieldConfig.hasNotes && (
            <TextField
              size="small"
              placeholder="Notiz..."
              value={newItem.comment || ''}
              onChange={(e) => setNewItem({ ...newItem, comment: e.target.value })}
              disabled={creatingItem}
              multiline
              rows={2}
            />
          )}

          {fieldConfig.hasPriority && (
            <FormControl size="small">
              <InputLabel>Priorität</InputLabel>
              <Select
                value={newItem.comment?.split('|priority:')[1]?.split('|')[0] || ''}
                label="Priorität"
                onChange={(e) => setNewItem({ ...newItem, comment: e.target.value })}
                disabled={creatingItem}
              >
                <MenuItem value="">Keine</MenuItem>
                <MenuItem value="⭐">⭐ Hoch</MenuItem>
                <MenuItem value="🔸">🔸 Mittel</MenuItem>
                <MenuItem value="🤍">🤍 Niedrig</MenuItem>
              </Select>
            </FormControl>
          )}

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            disabled={!newItem.name?.trim() || creatingItem}
            fullWidth
            sx={{
              background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
              },
            }}
          >
            Item hinzufügen
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
