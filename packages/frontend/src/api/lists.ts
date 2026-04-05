/**
 * Lists API client
 * Handles all HTTP requests to the backend lists endpoints
 */

import {API_BASE_URL, getAuthHeaders} from 'src/utils/api';

export interface CreateListRequest {
  color?: string;
  fieldConfig?: FieldConfig;
  icon?: string;
  name: string;
}

export interface FieldConfig {
  checkboxLabels?: string[];
  hasCheckbox?: boolean;
  hasExpiryDate?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  multipleCheckboxes?: boolean;
}

export interface List {
  color: string;
  createdAt?: string;
  fieldConfig: FieldConfig;
  icon: string;
  id: string;
  itemCount?: number;
  items?: any[];
  name: string;
  updatedAt?: string;
}

export interface UpdateListRequest {
  color?: string;
  fieldConfig?: FieldConfig;
  icon?: string;
  name?: string;
}

/**
 * Create a new list
 */
export async function createList(data: CreateListRequest): Promise<List> {
  const response = await fetch(`${API_BASE_URL}/lists`, {
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to create list: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Delete a list
 */
export async function deleteList(listId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
    headers: getAuthHeaders(),
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete list: ${response.statusText}`);
  }
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
 * Update a list
 */
export async function updateList(listId: string, data: UpdateListRequest): Promise<List> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Failed to update list: ${response.statusText}`);
  }
  return response.json();
}
