import {Box, TextField, Button, Grid} from '@mui/material';
import {LIST_ICONS, LIST_COLORS, PRESET_TEMPLATES} from 'src/constants/listTemplates';

interface ListBasicsStepProps {
  name: string;
  icon: string;
  color: string;
  loading?: boolean;
  onNameChange: (name: string) => void;
  onIconChange: (icon: string) => void;
  onColorChange: (color: string) => void;
  onTemplateSelect: (templateKey: keyof typeof PRESET_TEMPLATES) => void;
}

export const ListBasicsStep = ({
  name,
  icon,
  color,
  loading = false,
  onNameChange,
  onIconChange,
  onColorChange,
  onTemplateSelect,
}: ListBasicsStepProps) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, mt: 2}}>
      {/* List Name */}
      <TextField
        autoFocus
        fullWidth
        label="Listen-Name"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        disabled={loading}
      />

      {/* Icon Selection */}
      <Box>
        <Box sx={{mb: 1, fontWeight: 'bold', fontSize: '0.9em'}}>Icon</Box>
        <Grid container spacing={1}>
          {LIST_ICONS.map(ic => (
            <Grid item key={ic}>
              <Button
                variant={icon === ic ? 'contained' : 'outlined'}
                onClick={() => onIconChange(ic)}
                sx={{p: 1, minWidth: 50, fontSize: '1.5em'}}
                disabled={loading}
              >
                {ic}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Color Selection */}
      <Box>
        <Box sx={{mb: 1, fontWeight: 'bold', fontSize: '0.9em'}}>Farbe</Box>
        <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
          {LIST_COLORS.map(c => (
            <Box
              key={c}
              onClick={() => onColorChange(c)}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: c,
                borderRadius: '4px',
                cursor: 'pointer',
                border: color === c ? '3px solid #000' : '2px solid #ccc',
                transition: 'all 0.2s',
                '&:hover': {borderColor: '#000'},
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Preset Templates */}
      <Box>
        <Box sx={{mb: 1, fontWeight: 'bold', fontSize: '0.9em'}}>Vorlagen</Box>
        <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1}}>
          {Object.entries(PRESET_TEMPLATES).map(([key, template]) => (
            <Button
              key={key}
              variant="outlined"
              onClick={() => onTemplateSelect(key as keyof typeof PRESET_TEMPLATES)}
              fullWidth
              sx={{justifyContent: 'flex-start'}}
              disabled={loading}
            >
              {template.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
