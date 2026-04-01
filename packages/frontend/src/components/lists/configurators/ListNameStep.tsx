import {Box, TextField, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

interface ListNameStepProps {
  name: string;
  icon: string;
  loading?: boolean;
  onNameChange: (name: string) => void;
}

export const ListNameStep = ({name, icon, loading = false, onNameChange}: ListNameStepProps) => {
  const {t} = useTranslation();

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Typography variant="subtitle2" color="textSecondary">
        {t('pages.listOverview.inputLabel')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <Box sx={{fontSize: '2em'}}>{icon}</Box>
        <TextField
          autoFocus
          fullWidth
          label={t('pages.listOverview.inputLabel')}
          placeholder={t('components.placeholders.listNameExample')}
          value={name}
          onChange={e => onNameChange(e.target.value)}
          disabled={loading}
          variant="standard"
          sx={{
            '& input': {fontSize: '1.1em', fontWeight: 500},
          }}
        />
      </Box>
    </Box>
  );
};
