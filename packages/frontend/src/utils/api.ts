/**
 * API Configuration
 * Centralized API base URL using environment variables
 */

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const API_BASE_URL = `${baseUrl}/api`;

export const TOKEN_KEY = 'justincase_token';

/**
 * Returns auth headers with Bearer token if available
 */
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? {Authorization: `Bearer ${token}`} : {};
}
