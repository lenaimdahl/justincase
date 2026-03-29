/**
 * API Configuration
 * Centralized API base URL using environment variables
 */

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const API_BASE_URL = `${baseUrl}/api`;
