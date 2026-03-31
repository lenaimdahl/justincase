import {TableRow, TableCell, IconButton, CircularProgress, TextField, Box} from '@mui/material';
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
      <TableCell sx={{overflow: 'hidden'}}>
        <TextField
          size="small"
          label="Name"
          variant="standard"
          value={newItem.name}
          onChange={e => onItemChange({...newItem, name: e.target.value})}
          disabled={creatingItem}
          fullWidth
          sx={{maxWidth: 200}}
        />
      </TableCell>
      <TableCell align="right" sx={{overflow: 'hidden'}}>
        <Box sx={{width: '100%', maxWidth: 80}}>
          <TextField
            size="small"
            type="number"
            variant="standard"
            label="Menge"
            value={newItem.quantity}
            onChange={e =>
              onItemChange({
                ...newItem,
                quantity: Math.max(0, parseInt(e.target.value) || 0),
              })
            }
            disabled={creatingItem}
            slotProps={{htmlInput: {min: 0}}}
            fullWidth
            sx={{width: '100%'}}
          />
        </Box>
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <TextField
          size="small"
          label="Einheit"
          variant="standard"
          value={newItem.unit}
          onChange={e => onItemChange({...newItem, unit: e.target.value})}
          disabled={creatingItem}
          sx={{maxWidth: 120}}
        />
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <TextField
          size="small"
          type="date"
          variant="standard"
          label="Ablaufdatum"
          value={newItem.expiryDate}
          onChange={e => onItemChange({...newItem, expiryDate: e.target.value})}
          disabled={creatingItem}
          sx={{maxWidth: 150}}
        />
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <TextField
          size="small"
          label="Notiz"
          variant="standard"
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
