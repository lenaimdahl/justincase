import {TableRow, TableCell, Typography, Box} from '@mui/material';
import type {Item} from 'src/types/item';
import {getStatusClassName, formatExpiryDate} from 'src/utils/dateHelpers';

interface ExampleItemTableRowProps {
  item: Item;
}

export const ExampleItemTableRow = ({item}: ExampleItemTableRowProps) => {
  const statusClassName = getStatusClassName(item.expiryDate);
  const formattedDate = formatExpiryDate(item.expiryDate);

  const getDotColor = () => {
    if (statusClassName === 'item-status-warning') return '#eab308';
    if (statusClassName === 'item-status-expired') return '#f87171';
    return 'transparent';
  };

  const getCommentSx = () => {
    const isHighlight = statusClassName === 'item-status-warning' || statusClassName === 'item-status-expired';
    const color =
      statusClassName === 'item-status-warning'
        ? '#eab308'
        : statusClassName === 'item-status-expired'
          ? '#f87171'
          : '#999';
    return {
      color,
      fontWeight: isHighlight ? 'bold' : 'normal',
      fontSize: isHighlight ? '0.875rem' : '0.75rem',
    };
  };

  return (
    <TableRow
      sx={{
        '& .MuiTableCell-root': {
          padding: {xs: '8px 4px', sm: '16px'},
        },
      }}
    >
      <TableCell>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: getDotColor(),
              border: getDotColor() === 'transparent' ? '2px solid #d0d0d0' : 'none',
              flexShrink: 0,
            }}
          />
          <Typography variant="body2" sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}>
            {item.name}
          </Typography>
        </Box>
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
        <Typography variant="caption" sx={getCommentSx()}>
          {formattedDate || '—'}
        </Typography>
      </TableCell>
      <TableCell sx={{overflow: 'hidden'}}>
        <Typography variant="caption" sx={getCommentSx()}>
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
