import {TableRow, TableCell, IconButton, CircularProgress, Box, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Item, UpdateItemRequest} from 'src/types/item';

interface ItemTableRowProps {
  item: Item;
  state: Item & {isSaving?: boolean; error?: string | null};
  onAdjustQuantity: (itemId: string, adjustment: number) => Promise<void>;
  onUpdateField: (itemId: string, field: keyof UpdateItemRequest, value: string | number) => void;
  onDelete: (itemId: string) => Promise<void>;
}

export const ItemTableRow = ({item, state, onAdjustQuantity, onUpdateField, onDelete}: ItemTableRowProps) => {
  const isSaving = state.isSaving;
  const hasError = !!state.error;

  return (
    <TableRow
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
      <TableCell align="right">
        <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
          <IconButton
            size="small"
            onClick={() => onAdjustQuantity(item._id, -1)}
            disabled={isSaving || state.quantity <= 0}
            title="Decrease quantity"
            sx={{padding: {xs: '6px', sm: '8px'}, minWidth: {xs: 44, sm: 'auto'}, minHeight: {xs: 44, sm: 'auto'}}}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Box sx={{minWidth: 30, textAlign: 'center', fontSize: {xs: '0.875rem', sm: '1rem'}}}>{state.quantity}</Box>
          <IconButton
            size="small"
            onClick={() => onAdjustQuantity(item._id, 1)}
            disabled={isSaving}
            title="Increase quantity"
            sx={{padding: {xs: '6px', sm: '8px'}, minWidth: {xs: 44, sm: 'auto'}, minHeight: {xs: 44, sm: 'auto'}}}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={state.unit || ''}
          onChange={e => onUpdateField(item._id, 'unit', e.target.value)}
          placeholder="kg, liters, pcs"
          disabled={isSaving}
          error={hasError}
          sx={{maxWidth: {xs: 80, sm: 120}}}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="date"
          value={state.expiryDate || ''}
          onChange={e => onUpdateField(item._id, 'expiryDate', e.target.value)}
          disabled={isSaving}
          error={hasError}
          slotProps={{input: {}}}
          sx={{maxWidth: {xs: 120, sm: 150}}}
        />
      </TableCell>
      <TableCell sx={{display: {xs: 'none', sm: 'table-cell'}}}>
        <TextField
          size="small"
          value={state.comment || ''}
          onChange={e => onUpdateField(item._id, 'comment', e.target.value)}
          placeholder="Optional note"
          disabled={isSaving}
          error={hasError}
          sx={{maxWidth: 150}}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="small"
          onClick={() => onDelete(item._id)}
          disabled={isSaving}
          color="error"
          title="Delete item"
          sx={{padding: {xs: '6px', sm: '8px'}, minWidth: {xs: 44, sm: 'auto'}, minHeight: {xs: 44, sm: 'auto'}}}
        >
          {isSaving ? <CircularProgress size={20} /> : <DeleteIcon fontSize="small" />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
