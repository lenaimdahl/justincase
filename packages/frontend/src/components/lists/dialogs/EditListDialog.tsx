import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ListNameStep, ListColorStep, ListIconStep} from 'src/components/lists/configurators/steps';
import type {List} from 'src/types/list';

interface EditListDialogProps {
  open: boolean;
  list: List | null;
  onClose: () => void;
  onSubmit: (name: string, icon: string, color: string) => void;
  loading?: boolean;
}

export const EditListDialog = ({open, list, onClose, onSubmit, loading = false}: EditListDialogProps) => {
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📝');
  const [color, setColor] = useState('#9c27b0');

  useEffect(() => {
    if (list) {
      setName(list.name);
      setIcon(list.icon);
      setColor(list.color);
    }
  }, [list]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name, icon, color);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {maxHeight: {xs: '90vh', sm: '90vh'}, borderRadius: {xs: 2, sm: 4}},
        },
      }}
    >
      <DialogTitle sx={{fontSize: {xs: '1.25rem', sm: '1.5rem'}}}>
        {t('pages.listOverview.editDialogTitle')}
      </DialogTitle>
      <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <ListNameStep name={name} icon={icon} loading={loading} onNameChange={setName} />
        <ListColorStep color={color} loading={loading} onColorChange={setColor} />
        <ListIconStep icon={icon} loading={loading} onIconChange={setIcon} />
      </DialogContent>
      <DialogActions sx={{p: {xs: 1, sm: 2}, gap: {xs: 1, sm: undefined}}}>
        <Button onClick={onClose} disabled={loading} sx={{minHeight: {xs: 44, sm: 'auto'}}}>
          {t('pages.listConfigurator.cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name.trim() || loading}
          sx={{minHeight: {xs: 44, sm: 'auto'}}}
        >
          {t('pages.listOverview.saveButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
