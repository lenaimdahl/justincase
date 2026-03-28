import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ListCard } from '../components/ListCard';
import { useFetchLists } from '../hooks/useFetchLists';

export const ListOverviewPage = () => {
  const { t } = useTranslation();
  const { lists, loading, error, refetch } = useFetchLists();
  const [openDialog, setOpenDialog] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewListName('');
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      return;
    }

    // TODO: Connect to backend API
    // const response = await fetch('/api/lists', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: newListName }),
    // });

    console.log('Creating list:', newListName);
    handleCloseDialog();
    refetch();
  };

  const handleListCardClick = (listId: string) => {
    // TODO: Navigate to list detail page
    console.log('Navigate to list:', listId);
  };

  return (
    <Container
      component="main"
      sx={{
        py: 4,
        flex: 1,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h3" component="h1" sx={{ color: '#6a1b9a', mb: 1 }}>
            {t('pages.listOverview.title')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            {t('pages.listOverview.subtitle')}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
            '&:hover': {
              background:
                'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
            },
          }}
        >
          {t('pages.listOverview.createButton')}
        </Button>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {!loading && lists.length === 0 && !error && (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: '#fafafa',
            border: '2px dashed #e1bee7',
          }}
        >
          <Typography variant="h6" sx={{ color: '#757575', mb: 1 }}>
            {t('pages.listOverview.emptyState')}
          </Typography>
          <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
            {t('pages.listOverview.emptyStateDescription')}
          </Typography>
        </Paper>
      )}

      {/* Lists Grid */}
      {!loading && lists.length > 0 && (
        <Grid container spacing={3}>
          {lists.map((list) => (
            <Grid item xs={12} sm={6} md={4} key={list.id}>
              <ListCard
                name={list.name}
                itemCount={list.itemCount}
                onClick={() => handleListCardClick(list.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create List Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('pages.listOverview.dialogTitle')}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label={t('pages.listOverview.inputLabel')}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateList();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {t('pages.listOverview.cancelButton')}
          </Button>
          <Button
            onClick={handleCreateList}
            variant="contained"
            disabled={!newListName.trim()}
            sx={{
              background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
              '&:hover': {
                background:
                  'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
              },
            }}
          >
            {t('pages.listOverview.createButton')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
