import {Box, FormControlLabel, Checkbox, TextField, IconButton, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import type {FieldConfig} from 'src/api/lists';

interface ListCheckboxesStepProps {
  fieldConfig: FieldConfig;
  loading?: boolean;
  onMultipleCheckboxesChange: (enabled: boolean) => void;
  onCheckboxLabelChange: (index: number, value: string) => void;
  onAddCheckboxLabel: () => void;
  onRemoveCheckboxLabel: (index: number) => void;
}

export const ListCheckboxesStep = ({
  fieldConfig,
  loading = false,
  onMultipleCheckboxesChange,
  onCheckboxLabelChange,
  onAddCheckboxLabel,
  onRemoveCheckboxLabel,
}: ListCheckboxesStepProps) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Box sx={{fontWeight: 'bold', fontSize: '0.95em', mb: 1}}>Checkbox-Optionen</Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={fieldConfig.multipleCheckboxes || false}
            onChange={e => onMultipleCheckboxesChange(e.target.checked)}
            disabled={loading || !fieldConfig.hasCheckbox}
          />
        }
        label="Mehrere Checkbox-Kategorien"
      />

      {fieldConfig.multipleCheckboxes && (
        <Box sx={{ml: 2, display: 'flex', flexDirection: 'column', gap: 1.5}}>
          <Box sx={{fontSize: '0.9em', color: '#666', mb: 1}}>Definieren Sie die Labels für die Checkbox-Optionen</Box>

          {(fieldConfig.checkboxLabels || []).map((label, index) => (
            <Box key={index} sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
              <TextField
                size="small"
                placeholder={`Label ${index + 1}`}
                value={label}
                onChange={e => onCheckboxLabelChange(index, e.target.value)}
                disabled={loading}
                sx={{flex: 1}}
              />
              <IconButton size="small" onClick={() => onRemoveCheckboxLabel(index)} disabled={loading} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddCircleIcon />}
            onClick={onAddCheckboxLabel}
            disabled={loading}
            variant="outlined"
            size="small"
            sx={{alignSelf: 'flex-start'}}
          >
            Label hinzufügen
          </Button>
        </Box>
      )}

      {!fieldConfig.hasCheckbox && (
        <Box sx={{fontSize: '0.9em', color: '#999', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1}}>
          Aktivieren Sie "Checkboxen" im vorherigen Schritt, um diese Optionen zu verwenden.
        </Box>
      )}
    </Box>
  );
};
