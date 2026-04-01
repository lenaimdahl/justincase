import {useState} from 'react';
import {Box, Typography, Card, CardContent, Grid} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {EXAMPLE_LISTS, EXAMPLE_ITEMS} from 'src/constants/exampleItems';
import {ItemTable} from 'src/components/items/itemtables/ItemTable';
import type {FieldConfig} from 'src/types/list';

const getFieldConfigForList = (listId: string): FieldConfig => {
  switch (listId) {
    case 'example-shopping':
      return {hasCheckbox: true, hasQuantity: true, hasNotes: true, hasExpiryDate: false};
    case 'example-guests':
      return {
        hasCheckbox: true,
        multipleCheckboxes: true,
        checkboxLabels: ['Zugesagt', 'Abgesagt'],
        hasQuantity: true,
        hasNotes: false,
        hasExpiryDate: false,
      };
    case 'example-packing':
      return {hasCheckbox: true, hasQuantity: true, hasNotes: true, hasExpiryDate: false};
    case 'example-pantry':
      return {hasCheckbox: true, hasQuantity: true, hasNotes: true, hasExpiryDate: true};
    default:
      return {hasCheckbox: true};
  }
};

export const ExampleItemsShowcase = () => {
  const {t} = useTranslation();
  const [expandedList, setExpandedList] = useState<string | false>(EXAMPLE_LISTS[0].id);

  const getListItems = (listId: string) => EXAMPLE_ITEMS.filter(item => item.listId === listId);

  return (
    <Box sx={{mt: 6}}>
      <Typography variant="h5" gutterBottom>
        {t('pages.home.exampleTitle')}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{mb: 3}}>
        {t('pages.home.exampleDescription')}
      </Typography>

      {/* Legend - only show for Pantry which has expiry dates */}
      {(!expandedList || expandedList === 'example-pantry') && (
        <Box sx={{display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap'}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Box sx={{width: 12, height: 12, borderRadius: '50%', border: '2px solid #d0d0d0'}} />
            <Typography variant="caption">{t('pages.home.exampleLabelFresh')}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#eab308',
                boxShadow: '0 0 0 1px #eab308',
              }}
            />
            <Typography variant="caption">{t('pages.home.exampleLabelWarning')}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#f87171',
                boxShadow: '0 0 0 1px #f87171',
              }}
            />
            <Typography variant="caption">{t('pages.home.exampleLabelExpired')}</Typography>
          </Box>
        </Box>
      )}

      {/* Example Lists */}
      <Grid container spacing={2} sx={{mb: 4}}>
        {EXAMPLE_LISTS.map(list => (
          <Grid item xs={12} sm={6} md={4} key={list.id}>
            <Card
              sx={{
                cursor: 'pointer',
                border: expandedList === list.id ? 2 : 1,
                borderColor: expandedList === list.id ? list.color : '#ddd',
                backgroundColor: expandedList === list.id ? '#f9f9f9' : '#fff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
              onClick={() => setExpandedList(expandedList === list.id ? false : list.id)}
            >
              <CardContent>
                <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <span style={{fontSize: '1.5em'}}>{list.icon}</span>
                  {t(list.nameKey)}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {getListItems(list.id).length} items
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Items Table - shown when a list is expanded */}
      {expandedList && (
        <Box sx={{mb: 4}}>
          <Typography variant="h6" sx={{mb: 2}}>
            {EXAMPLE_LISTS.find(l => l.id === expandedList) &&
              t(EXAMPLE_LISTS.find(l => l.id === expandedList)!.nameKey)}{' '}
            Items
          </Typography>

          <ItemTable
            listId={expandedList}
            items={getListItems(expandedList)}
            fieldConfig={getFieldConfigForList(expandedList)}
            onItemsChange={async () => {}}
          />
        </Box>
      )}

      <Typography variant="body2" color="textSecondary" sx={{mt: 3}}>
        💡 <strong>Tip:</strong> {t('pages.home.exampleTip')}
      </Typography>
    </Box>
  );
};
