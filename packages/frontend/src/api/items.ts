/**
 * Items API client
 * Handles all HTTP requests to the backend items endpoints
 */

import type {CreateItemRequest, Item, UpdateItemRequest} from 'src/types/item';

import {API_BASE_URL, getAuthHeaders} from 'src/utils/api';

/**
 * Adjust item quantity by a given amount
 */
export async function adjustItemQuantity(listId: string, itemId: string, adjustment: number): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}/items/${itemId}/adjust`, {
    body: JSON.stringify({adjustment}),
    headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Failed to adjust quantity: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Create a new item in a list
 */
export async function createItem(listId: string, data: CreateItemRequest): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}/items`, {
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to create item: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Delete an item
 */
export async function deleteItem(listId: string, itemId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}/items/${itemId}`, {
    headers: getAuthHeaders(),
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete item: ${response.statusText}`);
  }
}

/**
 * Fetch all items for a list
 */
export async function fetchItemsByListId(listId: string): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}/items`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Update an item
 */
export async function updateItem(listId: string, itemId: string, data: UpdateItemRequest): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/lists/${listId}/items/${itemId}`, {
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Failed to update item: ${response.statusText}`);
  }
  return response.json();
}
