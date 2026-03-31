import {TableHead, TableRow, TableCell} from '@mui/material';
import {useTranslation} from 'react-i18next';

export const ExamplePackingListHeader = () => {
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
          {t('pages.packing.packedLabel') || 'Packed'}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
