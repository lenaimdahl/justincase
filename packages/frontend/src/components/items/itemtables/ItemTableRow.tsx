import {TableRow, TableCell, IconButton, CircularProgress, Box, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from 'react-i18next';
import type {Item, UpdateItemRequest} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {getStatusClassName} from 'src/utils/dateHelpers';

interface ItemTableRowProps {
  item: Item;
  state: Item & {isSaving?: boolean; error?: string | null};
  fieldConfig?: FieldConfig;
  onAdjustQuantity: (itemId: string, adjustment: number) => Promise<void>;
  onUpdateField: (itemId: string, field: keyof UpdateItemRequest, value: string | number) => void;
  onDelete: (itemId: string) => Promise<void>;
}

export const ItemTableRow = ({
  item,
  state,
  fieldConfig,
  onAdjustQuantity,
  onUpdateField,
  onDelete,
}: ItemTableRowProps) => {
  const {t} = useTranslation();
  const isSaving = state.isSaving;
  const hasError = !!state.error;
  const statusClassName = getStatusClassName(state.expiryDate);

  return (
    <TableRow
      className={statusClassName}
      sx={{
        opacity: isSaving ? 0.6 : 1,
        backgroundColor: hasError ? '#ffebee' : 'transparent',
        '& .MuiTableCell-root': {
          padding: {xs: '8px 4px', sm: '16px'},
        },
      }}
    >
      <TableCell>
        <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}>
          {state.name}
        </Typography>
      </TableCell>
      {fieldConfig?.hasQuantity !== false && (
        <>
          <TableCell align="right" sx={{overflow: 'hidden'}}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
              <IconButton
                size="small"
                onClick={() => onAdjustQuantity(item._id, -1)}
                disabled={isSaving || state.quantity <= 0}
                title={t('components.ariaLabels.decreaseQuantity')}
                sx={{padding: {xs: '6px', sm: '8px'}, minWidth: {xs: 44, sm: 'auto'}, minHeight: {xs: 44, sm: 'auto'}}}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Box sx={{minWidth: 30, textAlign: 'center', fontSize: {xs: '0.875rem', sm: '1rem'}}}>
                {state.quantity}
              </Box>
              <IconButton
                size="small"
                onClick={() => onAdjustQuantity(item._id, 1)}
                disabled={isSaving}
                title={t('components.ariaLabels.increaseQuantity')}
                sx={{padding: {xs: '6px', sm: '8px'}, minWidth: {xs: 44, sm: 'auto'}, minHeight: {xs: 44, sm: 'auto'}}}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </TableCell>
          <TableCell sx={{overflow: 'hidden'}}>
            <TextField
              size="small"
              label="Einheit"
              variant="standard"
              value={state.unit || ''}
              onChange={e => onUpdateField(item._id, 'unit', e.target.value)}
              disabled={isSaving}
              error={hasError}
              sx={{maxWidth: {xs: 80, sm: 120}}}
            />
          </TableCell>
        </>
      )}
      {fieldConfig?.hasExpiryDate !== false && (
        <TableCell sx={{overflow: 'hidden'}}>
          <TextField
            size="small"
            type="date"
            variant="standard"
            value={state.expiryDate || ''}
            onChange={e => onUpdateField(item._id, 'expiryDate', e.target.value)}
            disabled={isSaving}
            error={hasError}
            sx={{maxWidth: {xs: 120, sm: 150}}}
          />
        </TableCell>
      )}
      {fieldConfig?.hasNotes !== false && (
        <TableCell sx={{display: {xs: 'none', sm: 'table-cell'}, overflow: 'hidden'}}>
          <TextField
            size="small"
            variant="standard"
            value={state.comment || ''}
            onChange={e => onUpdateField(item._id, 'comment', e.target.value)}
            disabled={isSaving}
            error={hasError}
            sx={{maxWidth: 150}}
          />
        </TableCell>
      )}
      <TableCell align="center">
        <IconButton
          size="small"
          onClick={() => onDelete(item._id)}
          disabled={isSaving}
          color="error"
          title={t('components.ariaLabels.deleteItem')}
          sx={{padding: {xs: '6px', sm: '8px'}, minWidth: {xs: 44, sm: 'auto'}, minHeight: {xs: 44, sm: 'auto'}}}
        >
          {isSaving ? <CircularProgress size={20} /> : <DeleteIcon fontSize="small" />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
