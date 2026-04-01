import {Box} from '@mui/material';
import type {Item} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {ItemTable} from 'src/components/items/display/ItemTable';

interface ItemViewProps {
  listId: string;
  items: Item[];
  fieldConfig: FieldConfig;
  onItemsChange: () => Promise<void>;
}

export const ItemView = ({listId, items, fieldConfig, onItemsChange}: ItemViewProps) => {
  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', p: 2}}>
      <Box sx={{width: '100%', maxWidth: 1200}}>
        <ItemTable listId={listId} items={items} fieldConfig={fieldConfig} onItemsChange={onItemsChange} />
      </Box>
    </Box>
  );
};
