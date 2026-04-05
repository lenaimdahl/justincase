import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, Box} from '@mui/material';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import type {FieldConfig} from 'src/api/lists';
import {ListTemplateStep, ListColorStep, ListIconStep, ListNameStep} from 'src/components/lists/configurators/steps';
import {PRESET_TEMPLATES, DEFAULT_FIELD_CONFIG} from 'src/constants/listTemplates';

interface ListConfiguratorProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, icon: string, color: string, fieldConfig: FieldConfig) => void;
  loading?: boolean;
}

export const ListConfigurator = ({open, onClose, onSubmit, loading = false}: ListConfiguratorProps) => {
  const {t} = useTranslation();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📝');
  const [color, setColor] = useState('#9c27b0');
  const [fieldConfig, setFieldConfig] = useState<FieldConfig>(DEFAULT_FIELD_CONFIG);
  const [templateSelected, setTemplateSelected] = useState(false);

  const totalSteps = 4;

  const handleNext = () => {
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
    setName(t(preset.name));
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

    if (newConfig.checkboxLabels) {
      newConfig.checkboxLabels = newConfig.checkboxLabels.map(key => t(key));
    }

    setFieldConfig(newConfig);
    setTemplateSelected(true);
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
    <Dialog
      open={open}
      onClose={handleReset}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            maxHeight: {xs: '90vh', sm: '90vh'},
            borderRadius: {xs: 2, sm: 4},
          },
        },
      }}
    >
      <DialogTitle sx={{fontSize: {xs: '1.25rem', sm: '1.5rem'}}}>{t('pages.listConfigurator.title')}</DialogTitle>
      <Stepper activeStep={step} sx={{p: 2}}>
        <Step>
          <StepLabel sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>{t('pages.listConfigurator.stepTemplate')}</StepLabel>
        </Step>
        <Step>
          <StepLabel sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>{t('pages.listConfigurator.stepColor')}</StepLabel>
        </Step>
        <Step>
          <StepLabel sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>{t('pages.listConfigurator.stepIcon')}</StepLabel>
        </Step>
        <Step>
          <StepLabel sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>{t('pages.listConfigurator.stepName')}</StepLabel>
        </Step>
      </Stepper>

      <DialogContent sx={{minHeight: {xs: 250, sm: 300}, overflowY: 'auto'}}>
        {step === 0 && !templateSelected && (
          <ListTemplateStep loading={loading} onTemplateSelect={handleApplyTemplate} />
        )}

        {step === 1 && <ListColorStep color={color} loading={loading} onColorChange={setColor} />}

        {step === 2 && <ListIconStep icon={icon} loading={loading} onIconChange={setIcon} />}

        {step === 3 && <ListNameStep name={name} icon={icon} loading={loading} onNameChange={setName} />}

        <Box sx={{mt: 3, mb: -2, textAlign: 'center', fontSize: {xs: '0.8em', sm: '0.9em'}, color: '#999'}}>
          {t('pages.listConfigurator.step', {defaultValue: 'Step'})} {step + 1}{' '}
          {t('pages.listConfigurator.of', {defaultValue: 'of'})} {totalSteps}
        </Box>
      </DialogContent>

      <DialogActions sx={{p: {xs: 1, sm: 2}, gap: {xs: 1, sm: undefined}}}>
        <Button onClick={handleReset} disabled={loading} sx={{minHeight: {xs: 44, sm: 'auto'}}}>
          {t('pages.listConfigurator.cancel', {defaultValue: 'Cancel'})}
        </Button>
        {step > 0 && (
          <Button onClick={handleBack} disabled={loading} sx={{minHeight: {xs: 44, sm: 'auto'}}}>
            {t('pages.listConfigurator.back', {defaultValue: 'Back'})}
          </Button>
        )}
        {step < totalSteps - 1 && (
          <Button onClick={handleNext} variant="contained" disabled={loading} sx={{minHeight: {xs: 44, sm: 'auto'}}}>
            {t('pages.listConfigurator.next', {defaultValue: 'Next'})}
          </Button>
        )}
        {step === totalSteps - 1 && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!name.trim() || loading}
            sx={{minHeight: {xs: 44, sm: 'auto'}}}
          >
            {t('pages.listConfigurator.create', {defaultValue: 'Create'})}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
