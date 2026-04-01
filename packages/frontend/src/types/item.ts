/**
 * Item types and interfaces
 */

export interface Item {
  _id: string;
  listId: string;
  name: string;
  quantity: number;
  unit?: string;
  expiryDate?: string;
  expiryDates?: string[];
  comment?: string;
  checked?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemRequest {
  name: string;
  quantity: number;
  unit?: string;
  expiryDate?: string;
  expiryDates?: string[];
  comment?: string;
  checked?: number;
}

export interface UpdateItemRequest {
  name?: string;
  quantity?: number;
  unit?: string;
  expiryDate?: string;
  expiryDates?: string[];
  comment?: string;
  checked?: number;
}

export interface AdjustQuantityRequest {
  adjustment: number;
}

export interface EditingItem extends Item {
  isEditing?: boolean;
  isSaving?: boolean;
  error?: string | null;
}

export interface FormState {
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  comment: string;
}
