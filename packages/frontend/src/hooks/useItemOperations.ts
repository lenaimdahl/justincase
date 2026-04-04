import type {CreateItemRequest, EditingItem, Item, UpdateItemRequest} from 'src/types/item';

import {useCallback, useState} from 'react';
import {adjustItemQuantity, createItem, deleteItem, updateItem} from 'src/api/items';
import {useApiErrorHandler} from 'src/hooks/useApiErrorHandler';
import {useNotification} from 'src/hooks/useNotification';

const DEBOUNCE_DELAY = 1000; // ms

interface UseItemOperationsReturn {
  createError: null | string;
  creatingItem: boolean;
  editingState: Record<string, EditingItem>;
  handleAdjustQuantity: (itemId: string, adjustment: number) => Promise<void>;
  handleCreateItem: () => Promise<void>;
  handleDeleteItem: (itemId: string) => Promise<void>;
  initializeEditingState: (items: Item[]) => void;
  itemsInEditMode: Set<string>;
  newItem: {expiryDates?: string[]} & CreateItemRequest;
  setCreateError: (error: null | string) => void;
  setNewItem: (item: {expiryDates?: string[]} & CreateItemRequest) => void;
  toggleEditMode: (itemId: string) => void;
  updateField: (itemId: string, field: keyof UpdateItemRequest, value: number | string) => void;
}

/**
 * Hook to manage item operations (create, update, delete, adjust quantity)
 */
export const useItemOperations = (listId: string, onItemsChange: () => Promise<void>): UseItemOperationsReturn => {
  const [editingState, setEditingState] = useState<Record<string, EditingItem>>({});
  const [itemsInEditMode, setItemsInEditMode] = useState<Set<string>>(new Set());
  const [newItem, setNewItem] = useState<{expiryDates?: string[]} & CreateItemRequest>({
    comment: '',
    expiryDate: '',
    expiryDates: [],
    name: '',
    quantity: 1,
    unit: '',
  });
  const [creatingItem, setCreatingItem] = useState(false);
  const [createError, setCreateError] = useState<null | string>(null);
  const notification = useNotification();
  const {handleError} = useApiErrorHandler();

  const initializeEditingState = useCallback(
    (items: Item[]) => {
      const newState: Record<string, EditingItem> = {};
      items.forEach(item => {
        if (!editingState[item._id]) {
          newState[item._id] = {
            ...item,
            error: null,
            isEditing: false,
            isSaving: false,
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
    (itemId: string, field: keyof UpdateItemRequest, value: number | string) => {
      setEditingState(prev => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          error: null,
          [field]: value,
        },
      }));

      const timer = setTimeout(async () => {
        const item = editingState[itemId];
        if (!item) {
          return;
        }

        const updateData: UpdateItemRequest = {};
        (updateData as Record<string, number | string>)[field] = value;

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
          notification.success('Item updated');
        } catch (err) {
          const {errorMessage} = handleError(err, 'Update failed');
          setEditingState(prev => ({
            ...prev,
            [itemId]: {
              ...prev[itemId],
              error: errorMessage,
              isSaving: false,
            },
          }));
        }
      }, DEBOUNCE_DELAY);

      return () => clearTimeout(timer);
    },
    [listId, editingState, onItemsChange, notification, handleError]
  );

  const handleAdjustQuantity = useCallback(
    async (itemId: string, adjustment: number) => {
      const item = editingState[itemId];
      if (!item) {
        return;
      }

      // Prevent negative quantities
      if (item.quantity + adjustment < 0) {
        return;
      }

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
        notification.success('Quantity updated');
      } catch (err) {
        const {errorMessage} = handleError(err, 'Quantity adjustment failed');
        setEditingState(prev => ({
          ...prev,
          [itemId]: {
            ...prev[itemId],
            error: errorMessage,
            isSaving: false,
          },
        }));
      }
    },
    [listId, editingState, onItemsChange, notification, handleError]
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
        notification.success('Item deleted');
      } catch (err) {
        const {errorMessage} = handleError(err, 'Delete failed');
        setEditingState(prev => ({
          ...prev,
          [itemId]: {
            ...prev[itemId],
            error: errorMessage,
            isSaving: false,
          },
        }));
      }
    },
    [listId, onItemsChange, notification, handleError]
  );

  const handleCreateItem = useCallback(async () => {
    if (!newItem.name.trim()) {
      setCreateError('Item name is required');
      notification.error('Item name is required');
      return;
    }

    setCreatingItem(true);
    setCreateError(null);

    try {
      // Create a single item with expiryDates array if multiple dates provided
      const expiryDates = (newItem as any).expiryDates || [];
      const itemToCreate: {expiryDates?: string[]} & CreateItemRequest = {
        comment: newItem.comment,
        name: newItem.name,
        quantity: newItem.quantity || 1,
        unit: newItem.unit,
      };

      if (expiryDates.length > 0) {
        itemToCreate.expiryDates = expiryDates;
      } else if (newItem.expiryDate) {
        itemToCreate.expiryDate = newItem.expiryDate;
      }

      await createItem(listId, itemToCreate);

      setNewItem({
        comment: '',
        expiryDate: '',
        expiryDates: [],
        name: '',
        quantity: 1,
        unit: '',
      });
      await onItemsChange();
      notification.success('Item created successfully');
    } catch (err) {
      const {errorMessage} = handleError(err, 'Failed to create item');
      setCreateError(errorMessage);
    } finally {
      setCreatingItem(false);
    }
  }, [listId, newItem, onItemsChange, notification, handleError]);

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
    createError,
    creatingItem,
    editingState,
    handleAdjustQuantity,
    handleCreateItem,
    handleDeleteItem,
    initializeEditingState,
    itemsInEditMode,
    newItem,
    setCreateError,
    setNewItem,
    toggleEditMode,
    updateField,
  };
};
