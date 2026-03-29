import {Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import {useTranslation} from 'react-i18next';

interface CreateListDialogProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const CreateListDialog = ({open, value, onChange, onClose, onSubmit}: CreateListDialogProps) => {
  const {t} = useTranslation();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('pages.listOverview.dialogTitle')}</DialogTitle>
      <DialogContent sx={{pt: 2}}>
        <TextField
          autoFocus
          fullWidth
          label={t('pages.listOverview.inputLabel')}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} aria-label={t('pages.listOverview.cancelButton')}>
          {t('pages.listOverview.cancelButton')}
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!value.trim()}
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
