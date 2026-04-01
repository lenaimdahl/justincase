import {TableRow, TableCell, TableHead} from '@mui/material';
import {useTranslation} from 'react-i18next';

export const ExampleGuestListHeader = () => {
  const {t} = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{fontWeight: 'bold'}}>{t('common.name')}</TableCell>
        <TableCell align="right" sx={{fontWeight: 'bold'}}>
          {t('common.quantity')}
        </TableCell>
        <TableCell align="center" sx={{fontWeight: 'bold'}}>
          {t('common.actions')}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
