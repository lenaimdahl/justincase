import {Card, CardContent, Box, Typography, IconButton, TextField, Chip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from 'react-i18next';
import type {Item, UpdateItemRequest} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {getStatusClassName} from 'src/utils/dateHelpers';

interface ItemCardProps {
  item: Item;
  state: Item & {isSaving?: boolean; error?: string | null};
  fieldConfig?: FieldConfig;
  onAdjustQuantity: (itemId: string, adjustment: number) => Promise<void>;
  onUpdateField: (itemId: string, field: keyof UpdateItemRequest, value: string | number) => void;
  onDelete: (itemId: string) => Promise<void>;
  readOnly?: boolean;
}

export const ItemCard = ({
  item,
  state,
  fieldConfig,
  onAdjustQuantity,
  onUpdateField,
  onDelete,
  readOnly = false,
}: ItemCardProps) => {
  const {t} = useTranslation();
  const isSaving = state.isSaving;
  const hasError = !!state.error;
  const statusClassName = getStatusClassName(state.expiryDate);

  return (
    <Card
      className={statusClassName}
      sx={{
        mb: 2,
        opacity: isSaving ? 0.6 : 1,
        backgroundColor: hasError ? '#ffebee' : 'transparent',
      }}
    >
      <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2}}>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            {state.name}
          </Typography>
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(item._id)}
            disabled={readOnly || isSaving}
            aria-label={t('components.ariaLabels.deleteItem')}
            sx={{minWidth: 44, minHeight: 44, ml: 1}}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
          {fieldConfig?.hasQuantity !== false && (
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{mb: 1}}>
                {t('common.quantity')}
              </Typography>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <IconButton
                  size="small"
                  onClick={() => onAdjustQuantity(item._id, -1)}
                  disabled={readOnly || isSaving || state.quantity <= 0}
                  aria-label={t('components.ariaLabels.decreaseQuantity')}
                  sx={{minWidth: 44, minHeight: 44}}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{minWidth: 40, textAlign: 'center', fontWeight: 'bold'}}>{state.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => onAdjustQuantity(item._id, 1)}
                  disabled={readOnly || isSaving}
                  aria-label={t('components.ariaLabels.increaseQuantity')}
                  sx={{minWidth: 44, minHeight: 44}}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          {fieldConfig?.hasUnit !== false && (
            <TextField
              fullWidth
              size="small"
              label={t('common.unit')}
              variant="standard"
              value={state.unit || ''}
              onChange={e => onUpdateField(item._id, 'unit', e.target.value)}
              disabled={readOnly || isSaving}
              error={hasError}
            />
          )}

          {fieldConfig?.hasExpiryDate !== false && (
            <TextField
              fullWidth
              size="small"
              type="date"
              label={t('common.expiryDate')}
              variant="standard"
              value={state.expiryDate || ''}
              onChange={e => onUpdateField(item._id, 'expiryDate', e.target.value)}
              disabled={readOnly || isSaving}
              error={hasError}
              InputLabelProps={{shrink: true}}
            />
          )}

          {fieldConfig?.hasPriority !== false && state.priority && (
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{mb: 1}}>
                {t('common.priority')}
              </Typography>
              <Chip label={state.priority} size="small" variant="outlined" />
            </Box>
          )}

          {fieldConfig?.hasNotes !== false && state.comment && (
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{mb: 1}}>
                {t('common.notes')}
              </Typography>
              <Typography variant="body2">{state.comment}</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
