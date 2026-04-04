import {Box, Typography, Button} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';

interface ListOverviewHeaderProps {
  onCreateClick: () => void;
}

export const ListOverviewHeader = ({onCreateClick}: ListOverviewHeaderProps) => {
  const {t} = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {xs: 'flex-start', sm: 'center'},
        flexDirection: {xs: 'column', sm: 'row'},
        gap: {xs: 2, sm: 0},
        mb: 4,
      }}
    >
      <Box>
        <Typography
          variant="h3"
          component="h1"
          sx={{color: '#6a1b9a', mb: 1, fontSize: {xs: '1.75rem', sm: '2.125rem'}}}
        >
          {t('pages.listOverview.title')}
        </Typography>
        <Typography variant="body1" sx={{color: '#757575', fontSize: {xs: '0.875rem', sm: '1rem'}}}>
          {t('pages.listOverview.subtitle')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreateClick}
        aria-label={t('pages.listOverview.createButton')}
        fullWidth={{xs: true, sm: false}}
        sx={{
          background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
          },
          minHeight: {xs: 44, sm: 'auto'},
          fontSize: {xs: '0.875rem', sm: '1rem'},
        }}
      >
        {t('pages.listOverview.createButton')}
      </Button>
    </Box>
  );
};
