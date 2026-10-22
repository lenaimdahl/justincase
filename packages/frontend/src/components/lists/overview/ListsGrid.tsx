import {Box} from '@mui/material';
import {ListCard} from 'src/components/lists/card/ListCard';
import type {List} from 'src/types/list';

interface ListsGridProps {
  lists: List[];
  onListClick: (listId: string) => void;
  onEditList: (list: List) => void;
  onDeleteList: (list: List) => void;
}

export const ListsGrid = ({lists, onListClick, onEditList, onDeleteList}: ListsGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {lists.map(list => (
        <ListCard
          key={list.id}
          id={list.id}
          name={list.name}
          itemCount={list.itemCount}
          icon={list.icon}
          color={list.color}
          fieldConfig={list.fieldConfig}
          onClick={() => onListClick(list.id)}
          onEdit={() => onEditList(list)}
          onDelete={() => onDeleteList(list)}
        />
      ))}
    </Box>
  );
};
