/**
 * API Configuration
 * Centralized API base URL using environment variables
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
