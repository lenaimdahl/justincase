import {TableRow, TableCell} from '@mui/material';

export const ExampleGästelisteHeader = () => {
  return (
    <TableRow sx={{backgroundColor: '#f5f5f5'}}>
      <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
      <TableCell align="right" sx={{fontWeight: 'bold'}}>
        Quantity
      </TableCell>
      <TableCell align="center" sx={{fontWeight: 'bold'}}>
        Actions
      </TableCell>
    </TableRow>
  );
};
