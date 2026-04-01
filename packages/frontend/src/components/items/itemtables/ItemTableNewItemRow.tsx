import {TableRow, TableCell, Button, CircularProgress, TextField, Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from 'react-i18next';
import type {CreateItemRequest} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {getStatusClassName} from 'src/utils/dateHelpers';

interface ItemTableNewItemRowProps {
  newItem: CreateItemRequest;
  creatingItem: boolean;
  fieldConfig?: FieldConfig;
  onItemChange: (item: CreateItemRequest) => void;
  onSubmit: () => Promise<void>;
}

export const ItemTableNewItemRow = ({
  newItem,
  creatingItem,
  fieldConfig,
  onItemChange,
  onSubmit,
}: ItemTableNewItemRowProps) => {
  const {t} = useTranslation();
  const statusClassName = getStatusClassName(newItem.expiryDate);

  return (
    <TableRow className={statusClassName} sx={{backgroundColor: '#f9f9f9'}}>
      <TableCell sx={{overflow: 'hidden', width: '40%'}}>
        <TextField
          size="small"
          label={t('common.name')}
          variant="standard"
          value={newItem.name}
          onChange={e => onItemChange({...newItem, name: e.target.value})}
          disabled={creatingItem}
          fullWidth
          sx={{maxWidth: 200}}
        />
      </TableCell>
      {fieldConfig?.hasQuantity !== false && (
        <>
          <TableCell align="center" sx={{overflow: 'hidden', width: '15%'}}>
            <Box sx={{width: '100%', maxWidth: 80}}>
              <TextField
                size="small"
                type="number"
                variant="standard"
                label={t('common.quantity')}
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
          {fieldConfig?.hasUnit !== false && (
            <TableCell sx={{overflow: 'hidden', width: '15%'}}>
              <TextField
                size="small"
                variant="standard"
                value={newItem.unit}
                onChange={e => onItemChange({...newItem, unit: e.target.value})}
                disabled={creatingItem}
                sx={{maxWidth: 120}}
              />
            </TableCell>
          )}
        </>
      )}
      {fieldConfig?.hasExpiryDate !== false && (
        <TableCell sx={{overflow: 'hidden', width: '15%'}}>
          <TextField
            size="small"
            type="date"
            variant="standard"
            value={newItem.expiryDate}
            onChange={e => onItemChange({...newItem, expiryDate: e.target.value})}
            disabled={creatingItem}
            sx={{maxWidth: 150}}
          />
        </TableCell>
      )}
      {fieldConfig?.hasNotes !== false && (
        <TableCell sx={{overflow: 'hidden', width: '15%'}}>
          <TextField
            size="small"
            variant="standard"
            value={newItem.comment}
            onChange={e => onItemChange({...newItem, comment: e.target.value})}
            disabled={creatingItem}
            sx={{maxWidth: 150}}
          />
        </TableCell>
      )}
      <TableCell align="center" sx={{width: '10%'}}>
        <Button
          variant="contained"
          startIcon={creatingItem ? undefined : <AddIcon />}
          onClick={onSubmit}
          disabled={creatingItem || !newItem.name.trim()}
          sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
            },
            color: 'white',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            fontSize: {xs: '0.75rem', sm: '0.875rem'},
            padding: {xs: '6px 12px', sm: '8px 16px'},
          }}
        >
          {creatingItem ? <CircularProgress size={20} sx={{color: 'white'}} /> : t('common.add')}
        </Button>
      </TableCell>
    </TableRow>
  );
};
