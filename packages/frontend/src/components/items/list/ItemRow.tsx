import {Box, Card, CardContent, IconButton, CircularProgress} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Item} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';

interface ItemRowProps {
  item: Item;
  state: Item & {isSaving?: boolean};
  isChecked: boolean;
  checkedItems: Record<string, Set<string>>;
  fieldConfig: FieldConfig;
  onCheck: (itemId: string) => void;
  onCheckMultiple: (itemId: string, label: string) => void;
  onDelete: (itemId: string) => Promise<void>;
}

export const ItemRow = ({
  item,
  state,
  isChecked,
  checkedItems,
  fieldConfig,
  onCheck,
  onCheckMultiple,
  onDelete,
}: ItemRowProps) => {
  const formatDate = (date: any): string => {
    if (typeof date === 'string') {
      return date.startsWith('2') ? date.split('T')[0] : date;
    }
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <Card
      sx={{
        opacity: state.isSaving ? 0.6 : 1,
        backgroundColor: isChecked && fieldConfig.hasCheckbox ? '#f5f5f5' : 'white',
        textDecoration: isChecked && fieldConfig.hasCheckbox ? 'line-through' : 'none',
        color: isChecked && fieldConfig.hasCheckbox ? '#999' : 'auto',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{p: 2, display: 'flex', flexDirection: 'column', gap: 1.5}}>
        {/* Header mit Checkbox und Delete Button */}
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1}}>
          <Box
            sx={{
              flex: 1,
              cursor: fieldConfig.hasCheckbox ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            onClick={() => {
              if (fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes) {
                onCheck(item._id);
              }
            }}
          >
            {fieldConfig.hasCheckbox && !fieldConfig.multipleCheckboxes && (
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onCheck(item._id)}
                disabled={state.isSaving}
                style={{marginRight: 4, cursor: 'pointer'}}
              />
            )}
            <strong>{state.name}</strong>
          </Box>

          <IconButton
            size="small"
            onClick={() => onDelete(item._id)}
            disabled={state.isSaving}
            color="error"
            sx={{p: 0.5}}
          >
            {state.isSaving ? <CircularProgress size={20} /> : <DeleteIcon fontSize="small" />}
          </IconButton>
        </Box>

        {/* Item Details */}
        {fieldConfig.hasQuantity && state.quantity && (
          <Box sx={{fontSize: '0.9em', color: '#666'}}>Menge: {state.quantity}</Box>
        )}

        {/* Expiry Dates */}
        {fieldConfig.hasExpiryDate && (
          <>
            {(state as any).expiryDates &&
            Array.isArray((state as any).expiryDates) &&
            ((state as any).expiryDates as any[]).filter(d => d).length > 0 ? (
              <Box sx={{fontSize: '0.85em', color: '#d32f2f'}}>
                {((state as any).expiryDates as any[]).map((date, idx) => {
                  if (!date) return null;
                  return (
                    <Box key={idx}>
                      📅 {idx + 1}. {formatDate(date)}
                    </Box>
                  );
                })}
              </Box>
            ) : state.expiryDate ? (
              <Box sx={{fontSize: '0.9em', color: '#d32f2f'}}>📅 {formatDate(state.expiryDate)}</Box>
            ) : null}
          </>
        )}

        {/* Notes */}
        {fieldConfig.hasNotes && state.comment && (
          <Box sx={{fontSize: '0.85em', color: '#666', fontStyle: 'italic'}}>📝 {state.comment}</Box>
        )}

        {/* Multiple Checkboxes */}
        {fieldConfig.multipleCheckboxes && fieldConfig.checkboxLabels && (
          <Box sx={{borderTop: '1px solid #eee', pt: 1.5, mt: 1}}>
            <Box sx={{fontSize: '0.75em', fontWeight: 'bold', mb: 1, color: '#999'}}>Status:</Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.75}}>
              {fieldConfig.checkboxLabels.map(label => (
                <Box key={label} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <input
                    type="checkbox"
                    checked={checkedItems[label]?.has(item._id) ?? false}
                    onChange={() => onCheckMultiple(item._id, label)}
                    disabled={state.isSaving}
                    style={{cursor: 'pointer'}}
                  />
                  <label style={{fontSize: '0.9em', cursor: 'pointer'}}>{label}</label>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
