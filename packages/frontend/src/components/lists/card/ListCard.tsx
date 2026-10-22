import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, type MouseEvent} from 'react';
import {useTranslation} from 'react-i18next';
import type {List} from 'src/types/list';

interface ListCardProps extends List {
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ListCard = ({name, itemCount, onClick, onEdit, onDelete}: ListCardProps) => {
  const {t} = useTranslation();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEditClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleMenuClose();
    onEdit();
  };

  const handleDeleteClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleMenuClose();
    onDelete();
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(156, 39, 176, 0.15)',
        },
      }}
    >
      <IconButton
        onClick={handleMenuOpen}
        aria-label={t('components.ariaLabels.listOptions')}
        aria-haspopup="true"
        sx={{position: 'absolute', top: 4, right: 4, zIndex: 1}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        onClick={e => e.stopPropagation()}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('common.edit')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('common.delete')}</ListItemText>
        </MenuItem>
      </Menu>

      <CardActionArea
        onClick={onClick}
        sx={{flexGrow: 1}}
        aria-label={`${name}, ${t('common.itemCount', {count: itemCount})}`}
      >
        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
          <Typography variant="h6" component="div" sx={{color: '#6a1b9a', pr: 4}}>
            {name}
          </Typography>
          <Box sx={{display: 'flex', gap: 1, mt: 1}}>
            <Chip
              label={t('common.itemCount', {count: itemCount})}
              size="small"
              sx={{
                backgroundColor: '#e1bee7',
                color: '#6a1b9a',
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
