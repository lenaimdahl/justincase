import {Card, CardContent, CardActionArea, Typography, Box, Chip} from '@mui/material';
import {useTranslation} from 'react-i18next';
import type {List} from 'src/types/list';

interface ListCardProps extends List {
  onClick: () => void;
}

export const ListCard = ({name, itemCount, onClick}: ListCardProps) => {
  const {t} = useTranslation();
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(156, 39, 176, 0.15)',
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{flexGrow: 1}}
        aria-label={`${name}, ${t('common.itemCount', {count: itemCount})}`}
      >
        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
          <Typography variant="h6" component="div" sx={{color: '#6a1b9a'}}>
            {name}
          </Typography>
          <Box sx={{display: 'flex', gap: 1, mt: 1}}>
            <Chip
              label={t('common.itemCount', {count: itemCount})}
              size="small"
              sx={{
                backgroundColor: '#e1bee7',
                color: '#6a1b9a',
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
