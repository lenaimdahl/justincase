/**
 * Item types and interfaces
 */

export interface AdjustQuantityRequest {
  adjustment: number;
}

export interface CreateItemRequest {
  checked?: number;
  comment?: string;
  expiryDate?: string;
  expiryDates?: string[];
  name: string;
  quantity: number;
  unit?: string;
}

export interface EditingItem extends Item {
  error?: null | string;
  isEditing?: boolean;
  isSaving?: boolean;
}

export interface FormState {
  comment: string;
  expiryDate: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Item {
  _id: string;
  checked?: number;
  comment?: string;
  createdAt?: string;
  expiryDate?: string;
  expiryDates?: string[];
  listId: string;
  name: string;
  quantity: number;
  unit?: string;
  updatedAt?: string;
}

export interface UpdateItemRequest {
  checked?: number;
  comment?: string;
  expiryDate?: string;
  expiryDates?: string[];
  name?: string;
  quantity?: number;
  unit?: string;
}
