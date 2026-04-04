import {Box, Button, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {PRESET_TEMPLATES} from 'src/constants/listTemplates';

interface ListTemplateStepProps {
  loading?: boolean;
  onTemplateSelect: (templateKey: keyof typeof PRESET_TEMPLATES) => void;
}

export const ListTemplateStep = ({loading = false, onTemplateSelect}: ListTemplateStepProps) => {
  const {t} = useTranslation();
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Typography variant="subtitle2" color="textSecondary">
        {t('pages.listTemplates.selectTemplate', 'Wähle eine Vorlage als Startpunkt:')}
      </Typography>
      <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2}}>
        {Object.entries(PRESET_TEMPLATES).map(([key, template]) => (
          <Button
            key={key}
            variant="outlined"
            onClick={() => onTemplateSelect(key as keyof typeof PRESET_TEMPLATES)}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              padding: 2,
              textAlign: 'left',
              height: 'auto',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderWidth: 2,
              '&:hover': {borderWidth: 2},
            }}
            disabled={loading}
          >
            <Typography variant="body2" sx={{fontWeight: 600}}>
              {t(template.name)}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{mt: 0.5}}>
              {template.description ? t(template.description) : t('pages.listTemplates.predefinedTemplate')}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};
