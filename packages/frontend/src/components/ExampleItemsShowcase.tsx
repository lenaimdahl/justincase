import {useState} from 'react';
import {Box, Typography, Card, CardContent, Table, TableBody, TableContainer, Paper, Grid} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {EXAMPLE_LISTS, EXAMPLE_ITEMS} from 'src/constants/exampleItems';
import {ItemTableHeader} from 'src/components/items/display/ItemTableHeader';
import {ExampleItemTableRow} from 'src/components/items/display/examples/ExampleItemTableRow';
import {ExampleGuestListHeader} from 'src/components/items/display/examples/ExampleGuestListHeader';
import {ExampleGuestListRow} from 'src/components/items/display/examples/ExampleGuestListRow';
import {ExamplePackingListHeader} from 'src/components/items/display/examples/ExamplePackingListHeader';
import {ExamplePackingListRow} from 'src/components/items/display/examples/ExamplePackingListRow';
import {ExampleShoppingListHeader} from 'src/components/items/display/examples/ExampleShoppingListHeader';
import {ExampleShoppingListRow} from 'src/components/items/display/examples/ExampleShoppingListRow';
import {ExamplePantryListHeader} from 'src/components/items/display/examples/ExamplePantryListHeader';
import {ExamplePantryListRow} from 'src/components/items/display/examples/ExamplePantryListRow';

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

          <TableContainer
            component={Paper}
            sx={{
              mb: 3,
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: 4,
                '&:hover': {
                  background: '#555',
                },
              },
            }}
          >
            <Table sx={{minWidth: {xs: 600, sm: 700}}}>
              {expandedList === 'example-shopping' ? (
                <>
                  <ExampleShoppingListHeader />
                  <TableBody>
                    {getListItems(expandedList).map(item => (
                      <ExampleShoppingListRow key={item._id} item={item} />
                    ))}
                  </TableBody>
                </>
              ) : expandedList === 'example-guests' ? (
                <>
                  <ExampleGuestListHeader />
                  <TableBody>
                    {getListItems(expandedList).map(item => (
                      <ExampleGuestListRow key={item._id} item={item} />
                    ))}
                  </TableBody>
                </>
              ) : expandedList === 'example-packing' ? (
                <>
                  <ExamplePackingListHeader />
                  <TableBody>
                    {getListItems(expandedList).map(item => (
                      <ExamplePackingListRow key={item._id} item={item} />
                    ))}
                  </TableBody>
                </>
              ) : expandedList === 'example-pantry' ? (
                <>
                  <ExamplePantryListHeader />
                  <TableBody>
                    {getListItems(expandedList).map(item => (
                      <ExamplePantryListRow key={item._id} item={item} />
                    ))}
                  </TableBody>
                </>
              ) : (
                <>
                  <ItemTableHeader />
                  <TableBody>
                    {getListItems(expandedList).map(item => (
                      <ExampleItemTableRow key={item._id} item={item} />
                    ))}
                  </TableBody>
                </>
              )}
            </Table>
          </TableContainer>
        </Box>
      )}

      <Typography variant="body2" color="textSecondary" sx={{mt: 3}}>
        💡 <strong>Tip:</strong> {t('pages.home.exampleTip')}
      </Typography>
    </Box>
  );
};
