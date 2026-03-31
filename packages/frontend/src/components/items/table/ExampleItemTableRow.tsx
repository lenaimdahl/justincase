import {TableRow, TableCell, Typography} from '@mui/material';
import type {Item} from 'src/types/item';
import {getStatusClassName, formatExpiryDate} from 'src/utils/dateHelpers';

interface ExampleItemTableRowProps {
  item: Item;
}

export const ExampleItemTableRow = ({item}: ExampleItemTableRowProps) => {
  const statusClassName = getStatusClassName(item.expiryDate);
  const formattedDate = formatExpiryDate(item.expiryDate);

  return (
    <TableRow
      className={statusClassName}
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
      <TableCell align="right" sx={{overflow: 'hidden'}}>
        <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}>
          {item.quantity}
        </Typography>
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}>
          {item.unit || '—'}
        </Typography>
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}>
          {formattedDate || '—'}
        </Typography>
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <Typography variant="caption" color="textSecondary">
          {item.comment || '—'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption" color="textSecondary">
          —
        </Typography>
      </TableCell>
    </TableRow>
  );
};
