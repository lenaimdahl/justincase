import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, Box} from '@mui/material';
import {useState} from 'react';
import type {FieldConfig} from 'src/api/lists';
import {ListTemplateStep} from 'src/components/lists/configurators/ListTemplateStep';
import {ListColorStep} from 'src/components/lists/configurators/ListColorStep';
import {ListIconStep} from 'src/components/lists/configurators/ListIconStep';
import {ListNameStep} from 'src/components/lists/configurators/ListNameStep';
import {PRESET_TEMPLATES, DEFAULT_FIELD_CONFIG} from 'src/constants/listTemplates';

interface ListConfiguratorProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, icon: string, color: string, fieldConfig: FieldConfig) => void;
  loading?: boolean;
}

export const ListConfigurator = ({open, onClose, onSubmit, loading = false}: ListConfiguratorProps) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📝');
  const [color, setColor] = useState('#9c27b0');
  const [fieldConfig, setFieldConfig] = useState<FieldConfig>(DEFAULT_FIELD_CONFIG);
  const [templateSelected, setTemplateSelected] = useState(false);

  const totalSteps = 4; // Templates, Color, Icon, Name

  const handleNext = () => {
    if (step === 2 && !name.trim()) return; // Validate name before submit
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleApplyTemplate = (template: keyof typeof PRESET_TEMPLATES) => {
    const preset = PRESET_TEMPLATES[template];
    setName(preset.name);
    const newConfig: FieldConfig = {...DEFAULT_FIELD_CONFIG};

    const fieldsToMap = [
      'hasCheckbox',
      'multipleCheckboxes',
      'checkboxLabels',
      'hasExpiryDate',
      'hasQuantity',
      'hasUnit',
      'hasNotes',
      'hasPriority',
    ] as const;

    fieldsToMap.forEach(field => {
      if (field in preset) {
        (newConfig as Record<string, unknown>)[field] = preset[field as keyof typeof preset];
      }
    });

    setFieldConfig(newConfig);
    setTemplateSelected(true);
    // Move to next step after template selection
    setStep(1);
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
    setFieldConfig(DEFAULT_FIELD_CONFIG);
    setTemplateSelected(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleReset} maxWidth="sm" fullWidth>
      <DialogTitle>Liste erstellen</DialogTitle>
      <Stepper activeStep={step} sx={{p: 2}}>
        <Step>
          <StepLabel>Vorlage</StepLabel>
        </Step>
        <Step>
          <StepLabel>Farbe</StepLabel>
        </Step>
        <Step>
          <StepLabel>Icon</StepLabel>
        </Step>
        <Step>
          <StepLabel>Name</StepLabel>
        </Step>
      </Stepper>

      <DialogContent sx={{minHeight: 300}}>
        {step === 0 && !templateSelected && (
          <ListTemplateStep loading={loading} onTemplateSelect={handleApplyTemplate} />
        )}

        {step === 1 && <ListColorStep color={color} loading={loading} onColorChange={setColor} />}

        {step === 2 && <ListIconStep icon={icon} loading={loading} onIconChange={setIcon} />}

        {step === 3 && <ListNameStep name={name} icon={icon} loading={loading} onNameChange={setName} />}

        {/* Progress indicator */}
        <Box sx={{mt: 3, mb: -2, textAlign: 'center', fontSize: '0.9em', color: '#999'}}>
          Schritt {step + 1} von {totalSteps}
        </Box>
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
        {step < totalSteps - 1 && (
          <Button onClick={handleNext} variant="contained" disabled={(step === 2 && !name.trim()) || loading}>
            Weiter
          </Button>
        )}
        {step === totalSteps - 1 && (
          <Button onClick={handleSubmit} variant="contained" disabled={!name.trim() || loading}>
            Erstellen
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
