import { Container, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Container
      component="main"
      sx={{
        py: 4,
        flex: 1,
      }}
    >
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('pages.home.title')}
        </Typography>
        <Typography variant="body1">{t('pages.home.description')}</Typography>
      </Box>
    </Container>
  );
};
