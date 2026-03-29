import {Card, CardContent, CardActionArea, Typography, Box, Chip} from '@mui/material';
import type {List} from 'src/types/list';

interface ListCardProps extends List {
  onClick: () => void;
}

export const ListCard = ({name, itemCount, icon, color, onClick}: ListCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        borderTop: `4px solid ${color}`,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 16px ${color}33`,
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{flexGrow: 1}}
        aria-label={`${name}, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
      >
        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Typography sx={{fontSize: '2em'}}>{icon}</Typography>
            <Typography variant="h6" component="div" sx={{color}}>
              {name}
            </Typography>
          </Box>
          <Box sx={{display: 'flex', gap: 1, mt: 1}}>
            <Chip
              label={`${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}`}
              size="small"
              sx={{
                backgroundColor: color + '20',
                color: color,
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
