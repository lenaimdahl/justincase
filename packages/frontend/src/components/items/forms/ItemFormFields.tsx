import {TextField, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';
import {useTranslation} from 'react-i18next';
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

  const {t} = useTranslation();

  return (
    <TextField
      size="small"
      type="number"
      placeholder={t('common.quantity')}
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
      sx={{width: {xs: '100%', sm: 100}}}
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
      sx={{width: {xs: '100%', sm: 140}}}
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
  const {t} = useTranslation();
  if (!fieldConfig.hasExpiryDate || !fieldConfig.hasQuantity || (quantity || 1) <= 1) return null;

  return (
    <Box sx={{mt: 1.5, p: 1.5, border: '1px solid #ddd', borderRadius: 1, bgcolor: '#f9f9f9'}}>
      <Box component="strong" sx={{fontSize: {xs: '0.85em', sm: '0.9em'}, display: 'block', mb: 1}}>
        {t('pages.listConfigurator.expiryDatesLabel')}
      </Box>
      <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', sm: 'repeat(auto-fit, minmax(150px, 1fr))'}, gap: 1}}>
        {Array.from({length: quantity || 1}).map((_, idx) => (
          <Box key={idx} sx={{display: 'flex', flexDirection: 'column', gap: 0.5}}>
            <Box sx={{fontSize: {xs: '0.75em', sm: '0.8em'}, fontWeight: 500, color: '#666'}}>
              {t('pages.listConfigurator.quantityLabel')} {idx + 1}
            </Box>
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

  const handlePriorityChange = (priority: string) => {
    const notesPart = comment?.split('|priority:')[0] || '';
    const newComment = priority ? `${notesPart}|priority:${priority}` : notesPart;
    onChange({...newItem, comment: newComment});
  };

  return (
    <FormControl size="small" sx={{width: {xs: '100%', sm: 'auto'}, minWidth: {xs: '100%', sm: 130}}}>
      <InputLabel>Priorität</InputLabel>
      <Select
        value={comment?.split('|priority:')[1]?.split('|')[0] || ''}
        label="Priorität"
        onChange={e => handlePriorityChange(e.target.value)}
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
  const {t} = useTranslation();

  if (!fieldConfig.hasNotes) return null;

  return (
    <TextField
      size="small"
      placeholder={t('components.placeholders.notes')}
      value={value || ''}
      onChange={e => onChange({...newItem, comment: e.target.value})}
      disabled={disabled}
      sx={{width: {xs: '100%', sm: 150}}}
    />
  );
};
