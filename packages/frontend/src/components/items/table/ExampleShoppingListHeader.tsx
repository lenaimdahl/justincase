import {TableHead, TableRow, TableCell} from '@mui/material';
import {useTranslation} from 'react-i18next';

export const ExampleShoppingListHeader = () => {
  const {t} = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{fontWeight: 'bold'}}>{t('common.name')}</TableCell>
        <TableCell align="right" sx={{fontWeight: 'bold'}}>
          {t('common.quantity')}
        </TableCell>
        <TableCell sx={{fontWeight: 'bold'}}>{t('common.comment')}</TableCell>
        <TableCell align="center" sx={{fontWeight: 'bold'}}>
          {t('pages.shopping.actionLabel')}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
