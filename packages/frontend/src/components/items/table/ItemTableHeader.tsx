import {TableRow, TableCell} from '@mui/material';
import type {FieldConfig} from 'src/types/list';

interface ItemTableHeaderProps {
  fieldConfig?: FieldConfig;
}

export const ItemTableHeader = ({fieldConfig}: ItemTableHeaderProps) => {
  return (
    <TableRow sx={{backgroundColor: '#f5f5f5'}}>
      <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
      {fieldConfig?.hasQuantity !== false && (
        <>
          <TableCell align="right" sx={{fontWeight: 'bold'}}>
            Quantity
          </TableCell>
          <TableCell sx={{fontWeight: 'bold'}}>Unit</TableCell>
        </>
      )}
      {fieldConfig?.hasExpiryDate !== false && <TableCell sx={{fontWeight: 'bold'}}>Expiry Date</TableCell>}
      {fieldConfig?.hasNotes !== false && <TableCell sx={{fontWeight: 'bold'}}>Comment</TableCell>}
      <TableCell align="center" sx={{fontWeight: 'bold'}}>
        Actions
      </TableCell>
    </TableRow>
  );
};
