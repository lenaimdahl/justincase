import {useState, useCallback} from 'react';
import type {Item, CreateItemRequest, UpdateItemRequest, EditingItem} from 'src/types/item';
import {createItem, updateItem, deleteItem, adjustItemQuantity} from 'src/api/items';

const DEBOUNCE_DELAY = 1000; // ms

interface UseItemOperationsReturn {
  editingState: Record<string, EditingItem>;
  itemsInEditMode: Set<string>;
  newItem: CreateItemRequest & {expiryDates?: string[]};
  creatingItem: boolean;
  createError: string | null;
  setNewItem: (item: CreateItemRequest & {expiryDates?: string[]}) => void;
  setCreateError: (error: string | null) => void;
  updateField: (itemId: string, field: keyof UpdateItemRequest, value: string | number) => void;
  handleAdjustQuantity: (itemId: string, adjustment: number) => Promise<void>;
  handleDeleteItem: (itemId: string) => Promise<void>;
  handleCreateItem: () => Promise<void>;
  toggleEditMode: (itemId: string) => void;
  initializeEditingState: (items: Item[]) => void;
}

/**
 * Hook to manage item operations (create, update, delete, adjust quantity)
 */
export const useItemOperations = (listId: string, onItemsChange: () => Promise<void>): UseItemOperationsReturn => {
  const [editingState, setEditingState] = useState<Record<string, EditingItem>>({});
  const [itemsInEditMode, setItemsInEditMode] = useState<Set<string>>(new Set());
  const [newItem, setNewItem] = useState<CreateItemRequest & {expiryDates?: string[]}>({
    name: '',
    quantity: 1,
    unit: '',
    expiryDate: '',
    comment: '',
    expiryDates: [],
  });
  const [creatingItem, setCreatingItem] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const initializeEditingState = useCallback(
    (items: Item[]) => {
      const newState: Record<string, EditingItem> = {};
      items.forEach(item => {
        if (!editingState[item._id]) {
          newState[item._id] = {
            ...item,
            isEditing: false,
            isSaving: false,
            error: null,
          };
        }
      });
      if (Object.keys(newState).length > 0) {
        setEditingState(prev => ({...prev, ...newState}));
      }
    },
    [editingState]
  );

  const updateField = useCallback(
    (itemId: string, field: keyof UpdateItemRequest, value: string | number) => {
      setEditingState(prev => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          [field]: value,
          error: null,
        },
      }));

      const timer = setTimeout(async () => {
        const item = editingState[itemId];
        if (!item) return;

        const updateData: UpdateItemRequest = {};
        (updateData as Record<string, string | number>)[field] = value;

        setEditingState(prev => ({
          ...prev,
          [itemId]: {...prev[itemId], isSaving: true},
        }));

        try {
          await updateItem(listId, itemId, updateData);
          await onItemsChange();
          setEditingState(prev => ({
            ...prev,
            [itemId]: {...prev[itemId], isSaving: false},
          }));
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Update failed';
          setEditingState(prev => ({
            ...prev,
            [itemId]: {
              ...prev[itemId],
              isSaving: false,
              error: errorMessage,
            },
          }));
        }
      }, DEBOUNCE_DELAY);

      return () => clearTimeout(timer);
    },
    [listId, editingState, onItemsChange]
  );

  const handleAdjustQuantity = useCallback(
    async (itemId: string, adjustment: number) => {
      const item = editingState[itemId];
      if (!item) return;

      // Prevent negative quantities
      if (item.quantity + adjustment < 0) return;

      setEditingState(prev => ({
        ...prev,
        [itemId]: {...prev[itemId], isSaving: true},
      }));

      try {
        await adjustItemQuantity(listId, itemId, adjustment);
        await onItemsChange();
        setEditingState(prev => ({
          ...prev,
          [itemId]: {...prev[itemId], isSaving: false},
        }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Quantity adjustment failed';
        setEditingState(prev => ({
          ...prev,
          [itemId]: {
            ...prev[itemId],
            isSaving: false,
            error: errorMessage,
          },
        }));
      }
    },
    [listId, editingState, onItemsChange]
  );

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      setEditingState(prev => ({
        ...prev,
        [itemId]: {...prev[itemId], isSaving: true},
      }));

      try {
        await deleteItem(listId, itemId);
        await onItemsChange();
        setEditingState(prev => {
          const newState = {...prev};
          delete newState[itemId];
          return newState;
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Delete failed';
        setEditingState(prev => ({
          ...prev,
          [itemId]: {
            ...prev[itemId],
            isSaving: false,
            error: errorMessage,
          },
        }));
      }
    },
    [listId, onItemsChange]
  );

  const handleCreateItem = useCallback(async () => {
    if (!newItem.name.trim()) {
      setCreateError('Item name is required');
      return;
    }

    setCreatingItem(true);
    setCreateError(null);

    try {
      // Create a single item with expiryDates array if multiple dates provided
      const expiryDates = (newItem as any).expiryDates || [];
      const itemToCreate: CreateItemRequest & {expiryDates?: string[]} = {
        name: newItem.name,
        quantity: newItem.quantity || 1,
        unit: newItem.unit,
        comment: newItem.comment,
      };

      if (expiryDates.length > 0) {
        itemToCreate.expiryDates = expiryDates;
      } else if (newItem.expiryDate) {
        itemToCreate.expiryDate = newItem.expiryDate;
      }

      await createItem(listId, itemToCreate);

      setNewItem({
        name: '',
        quantity: 1,
        unit: '',
        expiryDate: '',
        comment: '',
        expiryDates: [],
      });
      await onItemsChange();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create item';
      setCreateError(errorMessage);
    } finally {
      setCreatingItem(false);
    }
  }, [listId, newItem, onItemsChange]);

  const toggleEditMode = useCallback((itemId: string) => {
    setItemsInEditMode(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  return {
    editingState,
    itemsInEditMode,
    newItem,
    creatingItem,
    createError,
    setNewItem,
    setCreateError,
    updateField,
    handleAdjustQuantity,
    handleDeleteItem,
    handleCreateItem,
    toggleEditMode,
    initializeEditingState,
  };
};
