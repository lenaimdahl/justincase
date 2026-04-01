import {Box, FormControlLabel, Checkbox} from '@mui/material';
import type {FieldConfig} from 'src/api/lists';

interface ListFieldsStepProps {
  fieldConfig: FieldConfig;
  loading?: boolean;
  onFieldChange: (field: keyof FieldConfig) => void;
}

export const ListFieldsStep = ({fieldConfig, loading = false, onFieldChange}: ListFieldsStepProps) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Box sx={{fontWeight: 'bold', fontSize: '0.95em', mb: 1}}>Verfügbare Felder</Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasCheckbox || false}
            onChange={() => onFieldChange('hasCheckbox')}
            disabled={loading}
          />
        }
        label="Checkboxen"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasQuantity || false}
            onChange={() => onFieldChange('hasQuantity')}
            disabled={loading}
          />
        }
        label="Menge"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasExpiryDate || false}
            onChange={() => onFieldChange('hasExpiryDate')}
            disabled={loading}
          />
        }
        label="Ablaufdatum"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasNotes || false}
            onChange={() => onFieldChange('hasNotes')}
            disabled={loading}
          />
        }
        label="Notizen"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.hasPriority || false}
            onChange={() => onFieldChange('hasPriority')}
            disabled={loading}
          />
        }
        label="Priorität"
      />
    </Box>
  );
};
