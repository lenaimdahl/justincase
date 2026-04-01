import {TableRow, TableCell, Typography, Box, Checkbox} from '@mui/material';
import {useTranslation} from 'react-i18next';
import type {Item} from 'src/types/item';

interface ExampleGuestListRowProps {
  item: Item;
}

export const ExampleGuestListRow = ({item}: ExampleGuestListRowProps) => {
  const {t} = useTranslation();
  const isConfirmed = item.comment === '✓';

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
      <TableCell align="center">
        <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
            <Checkbox
              checked={isConfirmed}
              readOnly
              size="small"
              title={t('pages.guestListTable.confirmed')}
              sx={{padding: '4px'}}
            />
            <Typography variant="caption" sx={{fontSize: {xs: '0.7rem', sm: '0.8rem'}}}>
              {t('pages.guestListTable.confirmed')}
            </Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
            <Checkbox
              checked={!isConfirmed && item.comment !== '✗'}
              readOnly
              size="small"
              title={t('pages.guestListTable.cancelled')}
              sx={{padding: '4px'}}
            />
            <Typography variant="caption" sx={{fontSize: {xs: '0.7rem', sm: '0.8rem'}}}>
              {t('pages.guestListTable.cancelled')}
            </Typography>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
};
