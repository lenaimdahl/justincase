import {Box, Alert} from '@mui/material';
import {useState, useEffect} from 'react';
import type {Item} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {useItemOperations} from 'src/hooks/useItemOperations';
import {ItemsList} from './ItemsList';
import {ItemForm} from './ItemForm';

interface ItemViewProps {
  listId: string;
  items: Item[];
  fieldConfig: FieldConfig;
  onItemsChange: () => Promise<void>;
}

export const ItemView = ({listId, items, fieldConfig, onItemsChange}: ItemViewProps) => {
  const {editingState, newItem, creatingItem, createError, setNewItem, handleDeleteItem, handleCreateItem} =
    useItemOperations(listId, onItemsChange);

  const [checkedItems, setCheckedItems] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    const state: Record<string, Set<string>> = {};
    if (fieldConfig.multipleCheckboxes && fieldConfig.checkboxLabels) {
      fieldConfig.checkboxLabels.forEach(label => {
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
    setCheckedItems({...checkedItems, simple: newChecked});
  };

  const handleCheckMultiple = (itemId: string, label: string) => {
    const newState = {...checkedItems};
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
      expiryDates: [],
    });
  };

  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', p: 2}}>
      <Box sx={{width: '100%', maxWidth: 1200}}>
        {createError && (
          <Alert severity="error" sx={{mb: 2}}>
            {createError}
          </Alert>
        )}

        <ItemsList
          items={items}
          editingState={editingState}
          checkedItems={checkedItems}
          fieldConfig={fieldConfig}
          onCheck={handleCheck}
          onCheckMultiple={handleCheckMultiple}
          onDelete={handleDeleteItem}
        />

        <ItemForm
          newItem={newItem}
          fieldConfig={fieldConfig}
          creatingItem={creatingItem}
          onItemChange={setNewItem}
          onSubmit={handleAddItem}
        />
      </Box>
    </Box>
  );
};
