import {TableRow, TableCell, IconButton, CircularProgress, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type {CreateItemRequest} from 'src/types/item';

interface ItemTableNewItemRowProps {
  newItem: CreateItemRequest;
  creatingItem: boolean;
  onItemChange: (item: CreateItemRequest) => void;
  onSubmit: () => Promise<void>;
}

export const ItemTableNewItemRow = ({newItem, creatingItem, onItemChange, onSubmit}: ItemTableNewItemRowProps) => {
  return (
    <TableRow sx={{backgroundColor: '#f9f9f9'}}>
      <TableCell>
        <TextField
          size="small"
          placeholder="New item name"
          value={newItem.name}
          onChange={e => onItemChange({...newItem, name: e.target.value})}
          disabled={creatingItem}
          fullWidth
          sx={{maxWidth: 200}}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          size="small"
          type="number"
          value={newItem.quantity}
          onChange={e =>
            onItemChange({
              ...newItem,
              quantity: Math.max(0, parseInt(e.target.value) || 0),
            })
          }
          disabled={creatingItem}
          slotProps={{htmlInput: {min: 0}}}
          sx={{maxWidth: 80}}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          placeholder="kg, liters, pcs"
          value={newItem.unit}
          onChange={e => onItemChange({...newItem, unit: e.target.value})}
          disabled={creatingItem}
          sx={{maxWidth: 120}}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="date"
          value={newItem.expiryDate}
          onChange={e => onItemChange({...newItem, expiryDate: e.target.value})}
          disabled={creatingItem}
          InputLabelProps={{shrink: true}}
          sx={{maxWidth: 150}}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          placeholder="Optional note"
          value={newItem.comment}
          onChange={e => onItemChange({...newItem, comment: e.target.value})}
          disabled={creatingItem}
          sx={{maxWidth: 150}}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="small"
          onClick={onSubmit}
          disabled={creatingItem || !newItem.name.trim()}
          color="primary"
          title="Add item"
        >
          {creatingItem ? <CircularProgress size={20} /> : <AddIcon fontSize="small" />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
