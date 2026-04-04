import type {FieldConfig} from 'src/api/lists';

export const LIST_ICONS = ['📝', '🛒', '👥', '🏠', '✈️', '🎉', '📚', '⚽', '🍽️', '🏋️', '🎵', '🌍'];

export const LIST_COLORS = ['#9c27b0', '#e91e63', '#f44336', '#ff9800', '#4caf50', '#2196f3', '#00bcd4', '#9e9e9e'];

export interface PresetTemplate {
  name: string;
  description?: string;
  hasCheckbox?: boolean;
  multipleCheckboxes?: boolean;
  checkboxLabels?: string[];
  hasExpiryDate?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
}

export const PRESET_TEMPLATES: Record<string, PresetTemplate> = {
  shopping: {
    name: 'pages.listTemplates.shopping.name',
    description: 'pages.listTemplates.shopping.description',
    hasCheckbox: true,
    checkboxLabels: ['Refilled'],
    hasQuantity: true,
    hasUnit: true,
    hasNotes: true,
    hasExpiryDate: false,
  },
  guestlist: {
    name: 'pages.listTemplates.guestlist.name',
    description: 'pages.listTemplates.guestlist.description',
    hasCheckbox: true,
    checkboxLabels: ['Zugesagt'],
    hasQuantity: true,
    hasUnit: false,
    hasNotes: false,
  },
  packing: {
    name: 'pages.listTemplates.packing.name',
    description: 'pages.listTemplates.packing.description',
    hasCheckbox: true,
    checkboxLabels: ['Packed'],
    hasQuantity: true,
    hasUnit: false,
    hasNotes: true,
    hasExpiryDate: false,
  },
  pantry: {
    name: 'pages.listTemplates.pantry.name',
    description: 'pages.listTemplates.pantry.description',
    hasCheckbox: true,
    checkboxLabels: ['Refill'],
    hasQuantity: true,
    hasUnit: true,
    hasNotes: true,
    hasExpiryDate: true,
  },
};

export const DEFAULT_FIELD_CONFIG: FieldConfig = {
  hasCheckbox: true,
  multipleCheckboxes: false,
  checkboxLabels: [],
  hasExpiryDate: false,
  hasQuantity: false,
  hasUnit: true,
  hasNotes: false,
  hasPriority: false,
};
