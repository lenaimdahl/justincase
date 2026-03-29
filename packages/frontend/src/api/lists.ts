/**
 * Lists API client
 * Handles all HTTP requests to the backend lists endpoints
 */

export interface List {
  id: string;
  name: string;
  itemCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateListRequest {
  name: string;
}

export interface UpdateListRequest {
  name?: string;
}

const API_BASE = '/api';

/**
 * Fetch all lists
 */
export async function fetchLists(): Promise<List[]> {
  const response = await fetch(`${API_BASE}/lists`);
  if (!response.ok) {
    throw new Error(`Failed to fetch lists: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a single list by ID
 */
export async function fetchListById(listId: string): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/${listId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch list: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Create a new list
 */
export async function createList(data: CreateListRequest): Promise<List> {
  const response = await fetch(`${API_BASE}/lists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
export async function updateList(
  listId: string,
  data: UpdateListRequest,
): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/${listId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
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
  const response = await fetch(`${API_BASE}/lists/${listId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete list: ${response.statusText}`);
  }
}
