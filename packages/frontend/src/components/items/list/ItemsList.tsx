import {Box} from '@mui/material';
import type {Item} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {ItemRow} from 'src/components/items/list/ItemRow';

interface ItemsListProps {
  items: Item[];
  editingState: Record<string, Item & {isSaving?: boolean}>;
  checkedItems: Record<string, Set<string>>;
  fieldConfig: FieldConfig;
  onCheck: (itemId: string) => void;
  onCheckMultiple: (itemId: string, label: string) => void;
  onDelete: (itemId: string) => Promise<void>;
}

export const ItemsList = ({
  items,
  editingState,
  checkedItems,
  fieldConfig,
  onCheck,
  onCheckMultiple,
  onDelete,
}: ItemsListProps) => {
  return (
    <Box sx={{mb: 3, width: '100%'}}>
      {/* Items Grid - Horizontales Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        {items.map(item => {
          const state = editingState[item._id] || item;
          const isChecked = checkedItems['simple']?.has(item._id) ?? false;

          return (
            <ItemRow
              key={item._id}
              item={item}
              state={state}
              isChecked={isChecked}
              checkedItems={checkedItems}
              fieldConfig={fieldConfig}
              onCheck={onCheck}
              onCheckMultiple={onCheckMultiple}
              onDelete={onDelete}
            />
          );
        })}
      </Box>

      {/* Empty State */}
      {items.length === 0 && (
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
    </Box>
  );
};
