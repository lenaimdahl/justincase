import {Box, Button, Grid, Typography} from '@mui/material';
import {LIST_ICONS} from 'src/constants/listTemplates';

interface ListIconStepProps {
  icon: string;
  loading?: boolean;
  onIconChange: (icon: string) => void;
}

export const ListIconStep = ({icon, loading = false, onIconChange}: ListIconStepProps) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Typography variant="subtitle2" color="textSecondary">
        Wähle ein Icon für deine Liste:
      </Typography>
      <Grid container spacing={1}>
        {LIST_ICONS.map(ic => (
          <Grid item xs={3} sm={2} key={ic}>
            <Button
              variant={icon === ic ? 'contained' : 'outlined'}
              onClick={() => onIconChange(ic)}
              fullWidth
              sx={{
                p: 2,
                fontSize: '2em',
                minHeight: 80,
                transition: 'all 0.2s',
                '&:hover': {transform: 'scale(1.1)'},
              }}
              disabled={loading}
            >
              {ic}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
