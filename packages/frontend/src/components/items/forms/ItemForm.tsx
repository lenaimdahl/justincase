import {Box, Button, Card, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from 'react-i18next';
import type {CreateItemRequest} from 'src/types/item';
import type {FieldConfig} from 'src/types/list';
import {
  QuantityField,
  SingleExpiryDateField,
  MultipleExpiryDatesField,
  PriorityField,
  NotesField,
} from './ItemFormFields';

interface ItemFormProps {
  newItem: CreateItemRequest & {expiryDates?: string[]};
  fieldConfig: FieldConfig;
  creatingItem: boolean;
  onItemChange: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
  onSubmit: () => Promise<void>;
}

export const ItemForm = ({newItem, fieldConfig, creatingItem, onItemChange, onSubmit}: ItemFormProps) => {
  const {t} = useTranslation();

  return (
    <Card sx={{p: {xs: 1.5, sm: 2}, width: '100%'}}>
      <Box
        sx={{
          display: 'flex',
          gap: {xs: 1, sm: 1.5},
          alignItems: {xs: 'stretch', sm: 'flex-end'},
          flexDirection: {xs: 'column', sm: 'row'},
          flexWrap: {xs: 'wrap', sm: 'nowrap'},
          overflowX: {xs: 'visible', sm: 'auto'},
        }}
      >
        <TextField
          size="small"
          placeholder={t('components.placeholders.itemName')}
          value={newItem.name || ''}
          onChange={e => onItemChange({...newItem, name: e.target.value})}
          disabled={creatingItem}
          sx={{minWidth: {xs: '100%', sm: 150}}}
          fullWidth={{xs: true, sm: false}}
        />

        <QuantityField
          value={newItem.quantity || 1}
          disabled={creatingItem}
          fieldConfig={fieldConfig}
          newItem={newItem}
          onChange={onItemChange}
        />

        <SingleExpiryDateField
          value={newItem.expiryDate || ''}
          disabled={creatingItem}
          fieldConfig={fieldConfig}
          quantity={newItem.quantity}
          newItem={newItem}
          onChange={onItemChange}
        />

        <PriorityField
          fieldConfig={fieldConfig}
          disabled={creatingItem}
          comment={newItem.comment}
          newItem={newItem}
          onChange={onItemChange}
        />

        <NotesField
          fieldConfig={fieldConfig}
          disabled={creatingItem}
          value={newItem.comment}
          newItem={newItem}
          onChange={onItemChange}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onSubmit}
          disabled={!newItem.name?.trim() || creatingItem}
          sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
            },
            minHeight: {xs: 44, sm: 40},
            minWidth: {xs: '100%', sm: 'auto'},
            flexShrink: 0,
          }}
        >
          {t('common.add')}
        </Button>
      </Box>

      <MultipleExpiryDatesField
        quantity={newItem.quantity}
        fieldConfig={fieldConfig}
        disabled={creatingItem}
        newItem={newItem}
        onChange={onItemChange}
      />
    </Card>
  );
};
