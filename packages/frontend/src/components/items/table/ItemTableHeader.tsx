import {TableRow, TableCell} from '@mui/material';

export const ItemTableHeader = () => {
  return (
    <TableRow sx={{backgroundColor: '#f5f5f5'}}>
      <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
      <TableCell align="right" sx={{fontWeight: 'bold'}}>
        Quantity
      </TableCell>
      <TableCell sx={{fontWeight: 'bold'}}>Unit</TableCell>
      <TableCell sx={{fontWeight: 'bold'}}>Expiry Date</TableCell>
      <TableCell sx={{fontWeight: 'bold'}}>Comment</TableCell>
      <TableCell align="center" sx={{fontWeight: 'bold'}}>
        Actions
      </TableCell>
    </TableRow>
  );
};
