import {Box, Button, Card, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type {CreateItemRequest} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';

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
        {fieldConfig.hasQuantity && (
          <TextField
            size="small"
            type="number"
            placeholder="Menge"
            value={newItem.quantity || 1}
            onChange={e => {
              const qty = parseInt(e.target.value) || 1;
              const expiryDates = (newItem as any).expiryDates || [];
              if (fieldConfig.hasExpiryDate) {
                while (expiryDates.length < qty) {
                  expiryDates.push('');
                }
                while (expiryDates.length > qty) {
                  expiryDates.pop();
                }
              }
              onItemChange({...newItem, quantity: qty, expiryDates});
            }}
            disabled={creatingItem}
            slotProps={{htmlInput: {min: 1}}}
            sx={{minWidth: 100}}
          />
        )}

        {/* Single Expiry Date */}
        {fieldConfig.hasExpiryDate && !(fieldConfig.hasQuantity && (newItem.quantity || 1) > 1) && (
          <TextField
            size="small"
            type="date"
            value={newItem.expiryDate || ''}
            onChange={e => onItemChange({...newItem, expiryDate: e.target.value})}
            disabled={creatingItem}
            sx={{minWidth: 140}}
          />
        )}

        {/* Priority */}
        {fieldConfig.hasPriority && (
          <FormControl size="small" sx={{minWidth: 130}}>
            <InputLabel>Priorität</InputLabel>
            <Select
              value={newItem.comment?.split('|priority:')[1]?.split('|')[0] || ''}
              label="Priorität"
              onChange={e => onItemChange({...newItem, comment: e.target.value})}
              disabled={creatingItem}
            >
              <MenuItem value="">Keine</MenuItem>
              <MenuItem value="⭐">⭐ Hoch</MenuItem>
              <MenuItem value="🔸">🔸 Mittel</MenuItem>
              <MenuItem value="🤍">🤍 Niedrig</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* Notes */}
        {fieldConfig.hasNotes && (
          <TextField
            size="small"
            placeholder="Notiz..."
            value={newItem.comment || ''}
            onChange={e => onItemChange({...newItem, comment: e.target.value})}
            disabled={creatingItem}
            sx={{minWidth: 150}}
          />
        )}

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
      {fieldConfig.hasExpiryDate && fieldConfig.hasQuantity && (newItem.quantity || 1) > 1 && (
        <Box sx={{mt: 1.5, p: 1.5, border: '1px solid #ddd', borderRadius: 1, bgcolor: '#f9f9f9'}}>
          <Box component="strong" sx={{fontSize: '0.9em', display: 'block', mb: 1}}>
            Ablaufdatum für jede Menge:
          </Box>
          <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1}}>
            {Array.from({length: newItem.quantity || 1}).map((_, idx) => (
              <TextField
                key={idx}
                size="small"
                type="date"
                value={(newItem as any).expiryDates?.[idx] || ''}
                onChange={e => {
                  const expiryDates = [...((newItem as any).expiryDates || [])];
                  expiryDates[idx] = e.target.value;
                  onItemChange({...(newItem as any), expiryDates});
                }}
                disabled={creatingItem}
                label={`Menge ${idx + 1}`}
              />
            ))}
          </Box>
        </Box>
      )}
    </Card>
  );
};
