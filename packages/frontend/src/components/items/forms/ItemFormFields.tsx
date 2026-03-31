import {TextField, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';
import type {CreateItemRequest} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';

export const QuantityField = ({
  value,
  disabled,
  fieldConfig,
  newItem,
  onChange,
}: {
  value: number;
  disabled: boolean;
  fieldConfig: FieldConfig;
  newItem: CreateItemRequest & {expiryDates?: string[]};
  onChange: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
}) => {
  if (!fieldConfig.hasQuantity) return null;

  return (
    <TextField
      size="small"
      type="number"
      placeholder="Menge"
      value={value || 1}
      onChange={e => {
        const qty = parseInt(e.target.value) || 1;
        const expiryDates = newItem.expiryDates || [];
        if (fieldConfig.hasExpiryDate) {
          while (expiryDates.length < qty) {
            expiryDates.push('');
          }
          while (expiryDates.length > qty) {
            expiryDates.pop();
          }
        }
        onChange({...newItem, quantity: qty, expiryDates});
      }}
      disabled={disabled}
      slotProps={{htmlInput: {min: 1}}}
      sx={{minWidth: 100}}
    />
  );
};

export const SingleExpiryDateField = ({
  value,
  disabled,
  fieldConfig,
  quantity,
  newItem,
  onChange,
}: {
  value: string;
  disabled: boolean;
  fieldConfig: FieldConfig;
  quantity?: number;
  newItem: CreateItemRequest & {expiryDates?: string[]};
  onChange: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
}) => {
  if (!fieldConfig.hasExpiryDate || (fieldConfig.hasQuantity && (quantity || 1) > 1)) return null;

  return (
    <TextField
      size="small"
      type="date"
      value={value || ''}
      onChange={e => onChange({...newItem, expiryDate: e.target.value})}
      disabled={disabled}
      sx={{minWidth: 140}}
    />
  );
};

export const MultipleExpiryDatesField = ({
  quantity,
  fieldConfig,
  disabled,
  newItem,
  onChange,
}: {
  quantity?: number;
  fieldConfig: FieldConfig;
  disabled: boolean;
  newItem: CreateItemRequest & {expiryDates?: string[]};
  onChange: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
}) => {
  if (!fieldConfig.hasExpiryDate || !fieldConfig.hasQuantity || (quantity || 1) <= 1) return null;

  return (
    <Box sx={{mt: 1.5, p: 1.5, border: '1px solid #ddd', borderRadius: 1, bgcolor: '#f9f9f9'}}>
      <Box component="strong" sx={{fontSize: '0.9em', display: 'block', mb: 1}}>
        Ablaufdatum für jede Menge:
      </Box>
      <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1}}>
        {Array.from({length: quantity || 1}).map((_, idx) => (
          <Box key={idx} sx={{display: 'flex', flexDirection: 'column', gap: 0.5}}>
            <Box sx={{fontSize: '0.8em', fontWeight: 500, color: '#666'}}>Menge {idx + 1}</Box>
            <TextField
              size="small"
              type="date"
              variant="standard"
              value={newItem.expiryDates?.[idx] || ''}
              onChange={e => {
                const expiryDates = [...(newItem.expiryDates || [])];
                expiryDates[idx] = e.target.value;
                onChange({...newItem, expiryDates});
              }}
              disabled={disabled}
              sx={{width: '100%'}}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const PriorityField = ({
  fieldConfig,
  disabled,
  comment,
  newItem,
  onChange,
}: {
  fieldConfig: FieldConfig;
  disabled: boolean;
  comment?: string;
  newItem: CreateItemRequest & {expiryDates?: string[]};
  onChange: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
}) => {
  if (!fieldConfig.hasPriority) return null;

  return (
    <FormControl size="small" sx={{minWidth: 130}}>
      <InputLabel>Priorität</InputLabel>
      <Select
        value={comment?.split('|priority:')[1]?.split('|')[0] || ''}
        label="Priorität"
        onChange={e => onChange({...newItem, comment: e.target.value})}
        disabled={disabled}
      >
        <MenuItem value="">Keine</MenuItem>
        <MenuItem value="⭐">⭐ Hoch</MenuItem>
        <MenuItem value="🔸">🔸 Mittel</MenuItem>
        <MenuItem value="🤍">🤍 Niedrig</MenuItem>
      </Select>
    </FormControl>
  );
};

export const NotesField = ({
  fieldConfig,
  disabled,
  value,
  newItem,
  onChange,
}: {
  fieldConfig: FieldConfig;
  disabled: boolean;
  value?: string;
  newItem: CreateItemRequest & {expiryDates?: string[]};
  onChange: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
}) => {
  if (!fieldConfig.hasNotes) return null;

  return (
    <TextField
      size="small"
      placeholder="Notiz..."
      value={value || ''}
      onChange={e => onChange({...newItem, comment: e.target.value})}
      disabled={disabled}
      sx={{minWidth: 150}}
    />
  );
};
