import {Box, FormControlLabel, Checkbox} from '@mui/material';
import {useTranslation} from 'react-i18next';
import type {FieldConfig} from 'src/api/lists';

interface ListFieldsStepProps {
  fieldConfig: FieldConfig;
  loading?: boolean;
  onFieldChange: (field: keyof FieldConfig) => void;
}

export const ListFieldsStep = ({fieldConfig, loading = false, onFieldChange}: ListFieldsStepProps) => {
  const {t} = useTranslation();
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Box sx={{fontWeight: 'bold', fontSize: '0.95em', mb: 1}}>{t('pages.listConfigurator.availableFieldsTitle')}</Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasCheckbox || false}
            onChange={() => onFieldChange('hasCheckbox')}
            disabled={loading}
          />
        }
        label={t('pages.listConfigurator.checkboxesFieldLabel')}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasQuantity || false}
            onChange={() => onFieldChange('hasQuantity')}
            disabled={loading}
          />
        }
        label={t('common.quantity')}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasExpiryDate || false}
            onChange={() => onFieldChange('hasExpiryDate')}
            disabled={loading}
          />
        }
        label={t('common.expiryDate')}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasNotes || false}
            onChange={() => onFieldChange('hasNotes')}
            disabled={loading}
          />
        }
        label={t('common.notes')}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasPriority || false}
            onChange={() => onFieldChange('hasPriority')}
            disabled={loading}
          />
        }
        label={t('common.priority')}
      />
    </Box>
  );
};
