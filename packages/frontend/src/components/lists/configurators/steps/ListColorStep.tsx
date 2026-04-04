import {Box, Typography} from '@mui/material';
import {LIST_COLORS} from 'src/constants/listTemplates';

interface ListColorStepProps {
  color: string;
  loading?: boolean;
  onColorChange: (color: string) => void;
}

export const ListColorStep = ({color, loading = false, onColorChange}: ListColorStepProps) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Typography variant="subtitle2" color="textSecondary">
        Wähle eine Farbe für deine Liste:
      </Typography>
      <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
        {LIST_COLORS.map(c => (
          <Box
            key={c}
            onClick={() => onColorChange(c)}
            sx={{
              width: 60,
              height: 60,
              backgroundColor: c,
              borderRadius: '8px',
              cursor: 'pointer',
              border: color === c ? '4px solid #000' : '2px solid #ddd',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#000',
                transform: 'scale(1.05)',
              },
              pointerEvents: loading ? 'none' : 'auto',
              opacity: loading ? 0.5 : 1,
            }}
            title={c}
          />
        ))}
      </Box>
    </Box>
  );
};
