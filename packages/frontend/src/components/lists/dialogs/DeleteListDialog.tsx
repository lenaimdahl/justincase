import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import type {List} from 'src/types/list';

interface DeleteListDialogProps {
  open: boolean;
  list: List | null;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const DeleteListDialog = ({open, list, onClose, onConfirm, loading = false}: DeleteListDialogProps) => {
  const {t} = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('pages.listOverview.deleteDialogTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('pages.listOverview.deleteConfirmMessage', {name: list?.name, count: list?.itemCount ?? 0})}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{p: {xs: 1, sm: 2}, gap: {xs: 1, sm: undefined}}}>
        <Button onClick={onClose} disabled={loading} sx={{minHeight: {xs: 44, sm: 'auto'}}}>
          {t('pages.listConfigurator.cancel')}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{minHeight: {xs: 44, sm: 'auto'}}}
        >
          {t('common.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
