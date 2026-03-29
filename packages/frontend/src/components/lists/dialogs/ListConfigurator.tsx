import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel} from '@mui/material';
import {useState} from 'react';
import type {FieldConfig} from 'src/api/lists';
import {ListBasicsStep} from './ListBasicsStep';
import {ListFieldsStep} from './ListFieldsStep';
import {ListCheckboxesStep} from './ListCheckboxesStep';
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
    const newConfig: FieldConfig = {...DEFAULT_FIELD_CONFIG};

    const fieldsToMap = [
      'hasCheckbox',
      'multipleCheckboxes',
      'checkboxLabels',
      'hasExpiryDate',
      'hasQuantity',
      'hasNotes',
      'hasPriority',
    ] as const;

    fieldsToMap.forEach(field => {
      if (field in preset) {
        (newConfig as Record<string, unknown>)[field] = preset[field as keyof typeof preset];
      }
    });

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
    setFieldConfig(DEFAULT_FIELD_CONFIG);
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
        {step === 0 && (
          <ListBasicsStep
            name={name}
            icon={icon}
            color={color}
            loading={loading}
            onNameChange={setName}
            onIconChange={setIcon}
            onColorChange={setColor}
            onTemplateSelect={handleApplyTemplate}
          />
        )}

        {step === 1 && <ListFieldsStep fieldConfig={fieldConfig} loading={loading} onFieldChange={handleFieldChange} />}

        {step === 2 && (
          <ListCheckboxesStep
            fieldConfig={fieldConfig}
            loading={loading}
            onMultipleCheckboxesChange={val => handleFieldChange('multipleCheckboxes')}
            onCheckboxLabelChange={handleCheckboxLabelChange}
            onAddCheckboxLabel={handleAddCheckboxLabel}
            onRemoveCheckboxLabel={handleRemoveCheckboxLabel}
          />
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
