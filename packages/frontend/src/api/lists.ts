/**
 * Lists API client
 * Handles all HTTP requests to the backend lists endpoints
 */

import {API_BASE_URL, getAuthHeaders} from 'src/utils/api';

export interface FieldConfig {
  hasCheckbox?: boolean;
  multipleCheckboxes?: boolean;
  checkboxLabels?: string[];
  hasExpiryDate?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
}

export interface List {
  id: string;
  name: string;
  itemCount?: number;
  items?: any[];
  icon: string;
  color: string;
  fieldConfig: FieldConfig;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateListRequest {
  name: string;
  icon?: string;
  color?: string;
  fieldConfig?: FieldConfig;
}

export interface UpdateListRequest {
  name?: string;
  icon?: string;
  color?: string;
  fieldConfig?: FieldConfig;
}

/**
 * Fetch all lists
 */
export async function fetchLists(): Promise<List[]> {
  const response = await fetch(`${API_BASE_URL}/lists`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch lists: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a single list by ID
 */
export async function fetchListById(listId: string): Promise<List> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch list: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Create a new list
 */
export async function createList(data: CreateListRequest): Promise<List> {
  const response = await fetch(`${API_BASE_URL}/lists`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create list: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Update a list
 */
export async function updateList(listId: string, data: UpdateListRequest): Promise<List> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update list: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Delete a list
 */
export async function deleteList(listId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to delete list: ${response.statusText}`);
  }
}
