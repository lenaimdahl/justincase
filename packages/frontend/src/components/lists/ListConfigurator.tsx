import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useState} from 'react';
import type {FieldConfig} from 'src/api/lists';

interface ListConfiguratorProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, icon: string, color: string, fieldConfig: FieldConfig) => void;
  loading?: boolean;
}

const ICONS = ['📝', '🛒', '👥', '🏠', '✈️', '🎉', '📚', '⚽', '🍽️', '🏋️', '🎵', '🌍'];
const COLORS = ['#9c27b0', '#e91e63', '#f44336', '#ff9800', '#4caf50', '#2196f3', '#00bcd4', '#9e9e9e'];

const PRESET_TEMPLATES = {
  shopping: {name: 'Einkaufsliste', hasCheckbox: true, hasQuantity: true},
  guestlist: {
    name: 'Gästeliste',
    hasCheckbox: true,
    multipleCheckboxes: true,
    checkboxLabels: ['Zugesagt', 'Abgesagt'],
  },
  packing: {name: 'Packliste', hasCheckbox: true},
  pantry: {name: 'Vorratsschrank', hasQuantity: true, hasExpiryDate: true},
};

export const ListConfigurator = ({open, onClose, onSubmit, loading = false}: ListConfiguratorProps) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📝');
  const [color, setColor] = useState('#9c27b0');
  const [fieldConfig, setFieldConfig] = useState<FieldConfig>({
    hasCheckbox: true,
    multipleCheckboxes: false,
    checkboxLabels: [],
    hasExpiryDate: false,
    hasQuantity: false,
    hasNotes: false,
    hasPriority: false,
  });

  const handleNext = () => {
    if (step === 0 && !name.trim()) return;
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFieldChange = (field: keyof FieldConfig) => {
    if (field === 'multipleCheckboxes') {
      setFieldConfig({
        ...fieldConfig,
        [field]: !(fieldConfig[field] as boolean),
        checkboxLabels: !(fieldConfig[field] as boolean) ? ['', ''] : [],
      });
    } else {
      setFieldConfig({
        ...fieldConfig,
        [field]: !(fieldConfig[field] as boolean),
      });
    }
  };

  const handleCheckboxLabelChange = (index: number, value: string) => {
    const labels = [...(fieldConfig.checkboxLabels || [])];
    labels[index] = value;
    setFieldConfig({...fieldConfig, checkboxLabels: labels});
  };

  const handleAddCheckboxLabel = () => {
    const labels = [...(fieldConfig.checkboxLabels || [])];
    labels.push('');
    setFieldConfig({...fieldConfig, checkboxLabels: labels});
  };

  const handleRemoveCheckboxLabel = (index: number) => {
    const labels = (fieldConfig.checkboxLabels || []).filter((_, i) => i !== index);
    setFieldConfig({...fieldConfig, checkboxLabels: labels});
  };

  const handleApplyTemplate = (template: keyof typeof PRESET_TEMPLATES) => {
    const preset = PRESET_TEMPLATES[template];
    setName(preset.name);
    const newConfig: FieldConfig = {
      hasCheckbox: false,
      multipleCheckboxes: false,
      checkboxLabels: [],
      hasExpiryDate: false,
      hasQuantity: false,
      hasNotes: false,
      hasPriority: false,
    };
    if ('hasCheckbox' in preset) newConfig.hasCheckbox = preset.hasCheckbox;
    if ('multipleCheckboxes' in preset) newConfig.multipleCheckboxes = preset.multipleCheckboxes;
    if ('checkboxLabels' in preset) newConfig.checkboxLabels = preset.checkboxLabels;
    if ('hasExpiryDate' in preset) newConfig.hasExpiryDate = preset.hasExpiryDate;
    if ('hasQuantity' in preset) newConfig.hasQuantity = preset.hasQuantity;
    setFieldConfig(newConfig);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name, icon, color, fieldConfig);
    handleReset();
  };

  const handleReset = () => {
    setStep(0);
    setName('');
    setIcon('📝');
    setColor('#9c27b0');
    setFieldConfig({
      hasCheckbox: true,
      multipleCheckboxes: false,
      checkboxLabels: [],
      hasExpiryDate: false,
      hasQuantity: false,
      hasNotes: false,
      hasPriority: false,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleReset} maxWidth="sm" fullWidth>
      <DialogTitle>Liste konfigurieren</DialogTitle>
      <Stepper activeStep={step} sx={{p: 2}}>
        <Step>
          <StepLabel>Basis</StepLabel>
        </Step>
        <Step>
          <StepLabel>Felder</StepLabel>
        </Step>
        <Step>
          <StepLabel>Checkboxen</StepLabel>
        </Step>
      </Stepper>

      <DialogContent sx={{minHeight: 400}}>
        {/* Step 0: Basis */}
        {step === 0 && (
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
            <TextField
              autoFocus
              fullWidth
              label="Listen-Name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
            />

            <Box>
              <Box sx={{mb: 1, fontWeight: 'bold', fontSize: '0.9em'}}>Icon</Box>
              <Grid container spacing={1}>
                {ICONS.map(ic => (
                  <Grid item key={ic}>
                    <Button
                      variant={icon === ic ? 'contained' : 'outlined'}
                      onClick={() => setIcon(ic)}
                      sx={{p: 1, minWidth: 50, fontSize: '1.5em'}}
                      disabled={loading}
                    >
                      {ic}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Box sx={{mb: 1, fontWeight: 'bold', fontSize: '0.9em'}}>Farbe</Box>
              <Grid container spacing={1}>
                {COLORS.map(col => (
                  <Grid item key={col}>
                    <Button
                      variant={color === col ? 'contained' : 'outlined'}
                      onClick={() => setColor(col)}
                      sx={{
                        p: 1,
                        minWidth: 50,
                        backgroundColor: col,
                        border: color === col ? '3px solid #000' : `1px solid ${col}`,
                      }}
                      disabled={loading}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{pt: 2}}>
              <Box sx={{fontWeight: 'bold', mb: 1, fontSize: '0.85em'}}>Oder Template:</Box>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                {Object.entries(PRESET_TEMPLATES).map(([key, preset]) => (
                  <Button
                    key={key}
                    variant="outlined"
                    onClick={() => handleApplyTemplate(key as keyof typeof PRESET_TEMPLATES)}
                    disabled={loading}
                    sx={{justifyContent: 'flex-start'}}
                  >
                    {preset.name}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* Step 1: Felder */}
        {step === 1 && (
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldConfig.hasCheckbox ?? false}
                  onChange={() => handleFieldChange('hasCheckbox')}
                  disabled={loading}
                />
              }
              label="☑️ Einfache Checkbox"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldConfig.multipleCheckboxes ?? false}
                  onChange={() => handleFieldChange('multipleCheckboxes')}
                  disabled={loading}
                />
              }
              label="☑️☑️ Mehrere Checkboxen (Kategorien)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldConfig.hasExpiryDate ?? false}
                  onChange={() => handleFieldChange('hasExpiryDate')}
                  disabled={loading}
                />
              }
              label="📅 Ablaufdatum"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldConfig.hasQuantity ?? false}
                  onChange={() => handleFieldChange('hasQuantity')}
                  disabled={loading}
                />
              }
              label="🔢 Menge/Anzahl"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldConfig.hasNotes ?? false}
                  onChange={() => handleFieldChange('hasNotes')}
                  disabled={loading}
                />
              }
              label="📝 Notizfeld"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldConfig.hasPriority ?? false}
                  onChange={() => handleFieldChange('hasPriority')}
                  disabled={loading}
                />
              }
              label="⭐ Priorität"
            />
          </Box>
        )}

        {/* Step 2: Checkbox Labels */}
        {step === 2 && (
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
            {!fieldConfig.multipleCheckboxes ? (
              <Box sx={{textAlign: 'center', color: '#999', py: 4}}>Keine Checkbox-Kategorien benötigt</Box>
            ) : (
              <>
                <Box sx={{fontWeight: 'bold'}}>Checkbox-Kategorien:</Box>
                {(fieldConfig.checkboxLabels || []).map((label, index) => (
                  <Box key={index} sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                    <TextField
                      size="small"
                      value={label}
                      onChange={e => handleCheckboxLabelChange(index, e.target.value)}
                      disabled={loading}
                      placeholder={`Kategorie ${index + 1}`}
                      sx={{flex: 1}}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveCheckboxLabel(index)}
                      disabled={loading}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  size="small"
                  startIcon={<AddCircleIcon />}
                  onClick={handleAddCheckboxLabel}
                  disabled={loading}
                  sx={{justifyContent: 'flex-start', pl: 0}}
                >
                  Kategorie hinzufügen
                </Button>
              </>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleReset} disabled={loading}>
          Abbrechen
        </Button>
        {step > 0 && (
          <Button onClick={handleBack} disabled={loading}>
            Zurück
          </Button>
        )}
        {step < 2 && (
          <Button onClick={handleNext} variant="contained" disabled={!name.trim() || loading}>
            Weiter
          </Button>
        )}
        {step === 2 && (
          <Button onClick={handleSubmit} variant="contained" disabled={!name.trim() || loading}>
            Erstellen
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
