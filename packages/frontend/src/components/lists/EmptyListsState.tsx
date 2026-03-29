import { Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const EmptyListsState = () => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: '#fafafa',
        border: '2px dashed #e1bee7',
      }}
    >
      <Typography variant="h6" sx={{ color: '#757575', mb: 1 }}>
        {t('pages.listOverview.emptyState')}
      </Typography>
      <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
        {t('pages.listOverview.emptyStateDescription')}
      </Typography>
    </Paper>
  );
};
