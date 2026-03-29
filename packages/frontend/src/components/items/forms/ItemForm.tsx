import {Box, Button, Card, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type {CreateItemRequest} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {
  QuantityField,
  SingleExpiryDateField,
  MultipleExpiryDatesField,
  PriorityField,
  NotesField,
} from './ItemFormFields';

interface ItemFormProps {
  newItem: CreateItemRequest & {expiryDates?: string[]};
  fieldConfig: FieldConfig;
  creatingItem: boolean;
  onItemChange: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
  onSubmit: () => Promise<void>;
}

export const ItemForm = ({newItem, fieldConfig, creatingItem, onItemChange, onSubmit}: ItemFormProps) => {
  return (
    <Card sx={{p: 2, width: '100%'}}>
      {/* Main Fields Row */}
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          alignItems: 'flex-end',
          flexWrap: 'nowrap',
          overflowX: 'auto',
        }}
      >
        {/* Item Name */}
        <TextField
          size="small"
          placeholder="Item name..."
          value={newItem.name || ''}
          onChange={e => onItemChange({...newItem, name: e.target.value})}
          disabled={creatingItem}
          sx={{minWidth: 150}}
        />

        {/* Quantity */}
        <QuantityField
          value={newItem.quantity || 1}
          disabled={creatingItem}
          fieldConfig={fieldConfig}
          newItem={newItem}
          onChange={onItemChange}
        />

        {/* Single Expiry Date */}
        <SingleExpiryDateField
          value={newItem.expiryDate || ''}
          disabled={creatingItem}
          fieldConfig={fieldConfig}
          quantity={newItem.quantity}
          newItem={newItem}
          onChange={onItemChange}
        />

        {/* Priority */}
        <PriorityField
          fieldConfig={fieldConfig}
          disabled={creatingItem}
          comment={newItem.comment}
          newItem={newItem}
          onChange={onItemChange}
        />

        {/* Notes */}
        <NotesField
          fieldConfig={fieldConfig}
          disabled={creatingItem}
          value={newItem.comment}
          newItem={newItem}
          onChange={onItemChange}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onSubmit}
          disabled={!newItem.name?.trim() || creatingItem}
          sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
            },
            height: '40px',
            flexShrink: 0,
          }}
        >
          hinzufügen
        </Button>
      </Box>

      {/* Multiple Expiry Dates (if quantity > 1) */}
      <MultipleExpiryDatesField
        quantity={newItem.quantity}
        fieldConfig={fieldConfig}
        disabled={creatingItem}
        newItem={newItem}
        onChange={onItemChange}
      />
    </Card>
  );
};
