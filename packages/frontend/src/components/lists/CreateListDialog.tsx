import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateListDialogProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (requiresExpiryDate: boolean, hasCheckboxes: boolean, checkboxOptions: string[]) => void;
  loading?: boolean;
}

export const CreateListDialog = ({
  open,
  value,
  onChange,
  onClose,
  onSubmit,
  loading = false,
}: CreateListDialogProps) => {
  const { t } = useTranslation();
  const [requiresExpiryDate, setRequiresExpiryDate] = useState(true);
  const [hasCheckboxes, setHasCheckboxes] = useState(false);
  const [checkboxOptions, setCheckboxOptions] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim() && !loading) {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setRequiresExpiryDate(true);
    setHasCheckboxes(false);
    setCheckboxOptions([]);
    onClose();
  };

  const handleAddOption = () => {
    setCheckboxOptions([...checkboxOptions, '']);
  };

  const handleOptionChange = (index: number, newValue: string) => {
    const updated = [...checkboxOptions];
    updated[index] = newValue;
    setCheckboxOptions(updated);
  };

  const handleRemoveOption = (index: number) => {
    setCheckboxOptions(checkboxOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const options = hasCheckboxes ? checkboxOptions.filter(Boolean) : [];
    onSubmit(requiresExpiryDate, hasCheckboxes, options);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('pages.listOverview.dialogTitle')}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label={t('pages.listOverview.inputLabel')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={requiresExpiryDate}
                onChange={(e) => setRequiresExpiryDate(e.target.checked)}
                disabled={loading}
              />
            }
            label="Ablaufdatum erforderlich"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={hasCheckboxes}
                onChange={(e) => {
                  setHasCheckboxes(e.target.checked);
                  if (!e.target.checked) {
                    setCheckboxOptions([]);
                  }
                }}
                disabled={loading}
              />
            }
            label="Checkboxes benötigt"
          />
          {hasCheckboxes && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pl: 4 }}>
              {checkboxOptions.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    disabled={loading}
                    placeholder={`Option ${index + 1}`}
                    sx={{ flex: 1 }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveOption(index)}
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
                onClick={handleAddOption}
                disabled={loading}
                sx={{ justifyContent: 'flex-start', pl: 0 }}
              >
                Option hinzufügen
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading} aria-label={t('pages.listOverview.cancelButton')}>
          {t('pages.listOverview.cancelButton')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!value.trim() || loading}
          aria-label={t('pages.listOverview.createButton')}
          sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
            },
          }}
        >
          {t('pages.listOverview.createButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
