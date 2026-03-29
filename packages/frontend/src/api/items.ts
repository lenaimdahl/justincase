/**
 * Items API client
 * Handles all HTTP requests to the backend items endpoints
 */

import type {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
} from 'src/types/item';

const API_BASE = '/api';

/**
 * Fetch all items for a list
 */
export async function fetchItemsByListId(listId: string): Promise<Item[]> {
  const response = await fetch(`${API_BASE}/lists/${listId}/items`);
  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Create a new item in a list
 */
export async function createItem(
  listId: string,
  data: CreateItemRequest,
): Promise<Item> {
  const response = await fetch(`${API_BASE}/lists/${listId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create item: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Update an item
 */
export async function updateItem(
  listId: string,
  itemId: string,
  data: UpdateItemRequest,
): Promise<Item> {
  const response = await fetch(
    `${API_BASE}/lists/${listId}/items/${itemId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to update item: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Delete an item
 */
export async function deleteItem(
  listId: string,
  itemId: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE}/lists/${listId}/items/${itemId}`,
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to delete item: ${response.statusText}`);
  }
}

/**
 * Adjust item quantity by a given amount
 */
export async function adjustItemQuantity(
  listId: string,
  itemId: string,
  adjustment: number,
): Promise<Item> {
  const response = await fetch(
    `${API_BASE}/lists/${listId}/items/${itemId}/adjust`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adjustment }),
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to adjust quantity: ${response.statusText}`);
  }
  return response.json();
}
