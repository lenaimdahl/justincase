import {TableRow, TableCell, Typography, Checkbox} from '@mui/material';
import {useTranslation} from 'react-i18next';
import type {Item} from 'src/types/item';

interface ExamplePackingListRowProps {
  item: Item;
}

export const ExamplePackingListRow = ({item}: ExamplePackingListRowProps) => {
  const {t} = useTranslation();
  const isPacked = item.comment === '✓';

  return (
    <TableRow
      sx={{
        '& .MuiTableCell-root': {
          padding: {xs: '8px 4px', sm: '16px'},
        },
      }}
    >
      <TableCell>
        <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}>
          {item.name}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}>
          {item.quantity}
        </Typography>
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <Typography variant="caption" color="textSecondary">
          {item.comment || '—'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Checkbox checked={isPacked} disabled size="small" title={t('pages.packing.packedLabel') || 'Packed'} />
      </TableCell>
    </TableRow>
  );
};
