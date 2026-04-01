import {TableRow, TableCell} from '@mui/material';
import {useTranslation} from 'react-i18next';
import type {FieldConfig} from 'src/types/list';

interface ItemTableHeaderProps {
  fieldConfig?: FieldConfig;
}

export const ItemTableHeader = ({fieldConfig}: ItemTableHeaderProps) => {
  const {t} = useTranslation();

  const getActionHeaderLabel = (): string => {
    if (fieldConfig?.checkboxLabels && fieldConfig.checkboxLabels.length > 0) {
      return fieldConfig.checkboxLabels[0];
    }
    return t('common.actions');
  };

  return (
    <TableRow sx={{backgroundColor: '#f5f5f5'}}>
      <TableCell sx={{fontWeight: 'bold', width: '40%'}}>{t('common.name')}</TableCell>
      {fieldConfig?.hasQuantity !== false && (
        <>
          <TableCell align="center" sx={{fontWeight: 'bold', width: '15%'}}>
            {t('common.quantity')}
          </TableCell>
          {fieldConfig?.hasUnit !== false && (
            <TableCell sx={{fontWeight: 'bold', width: '15%'}}>{t('common.unit')}</TableCell>
          )}
        </>
      )}
      {fieldConfig?.hasExpiryDate !== false && (
        <TableCell sx={{fontWeight: 'bold', width: '15%'}}>{t('common.expiryDate')}</TableCell>
      )}
      {fieldConfig?.hasNotes !== false && (
        <TableCell sx={{fontWeight: 'bold', width: '15%'}}>{t('common.comment')}</TableCell>
      )}
      <TableCell align="center" sx={{fontWeight: 'bold', width: '10%'}}>
        {getActionHeaderLabel()}
      </TableCell>
    </TableRow>
  );
};
