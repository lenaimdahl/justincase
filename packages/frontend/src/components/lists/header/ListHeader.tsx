import {Box, Typography} from '@mui/material';
import type {List} from 'src/types/list';

interface ListHeaderProps {
  list: List;
}

/**
 * Display list header with icon and name
 * Used in list detail page and other list views
 */
export const ListHeader = ({list}: ListHeaderProps) => {
  return (
    <Box sx={{mb: 3}}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: list.color,
          fontSize: {xs: '1.75rem', sm: '2.125rem'},
        }}
      >
        {list.icon} {list.name}
      </Typography>
    </Box>
  );
};
