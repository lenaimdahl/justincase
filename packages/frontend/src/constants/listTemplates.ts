import type {FieldConfig} from 'src/api/lists';

export const LIST_ICONS = ['📝', '🛒', '👥', '🏠', '✈️', '🎉', '📚', '⚽', '🍽️', '🏋️', '🎵', '🌍'];

export const LIST_COLORS = ['#9c27b0', '#e91e63', '#f44336', '#ff9800', '#4caf50', '#2196f3', '#00bcd4', '#9e9e9e'];

export interface PresetTemplate {
  checkboxLabels?: string[];
  description?: string;
  hasCheckbox?: boolean;
  hasExpiryDate?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  multipleCheckboxes?: boolean;
  name: string;
}

export const PRESET_TEMPLATES: Record<string, PresetTemplate> = {
  shopping: {
    name: 'pages.listTemplates.shopping.name',
    description: 'pages.listTemplates.shopping.description',
    hasCheckbox: true,
    checkboxLabels: ['pages.listTemplates.shopping.checkboxLabel'],
    hasQuantity: true,
    hasUnit: true,
    hasNotes: true,
    hasExpiryDate: false,
  },
  guestlist: {
    name: 'pages.listTemplates.guestlist.name',
    description: 'pages.listTemplates.guestlist.description',
    hasCheckbox: true,
    checkboxLabels: ['pages.listTemplates.guestlist.checkboxLabel'],
    hasQuantity: true,
    hasUnit: false,
    hasNotes: false,
  },
  packing: {
    name: 'pages.listTemplates.packing.name',
    description: 'pages.listTemplates.packing.description',
    hasCheckbox: true,
    checkboxLabels: ['pages.listTemplates.packing.checkboxLabel'],
    hasQuantity: true,
    hasUnit: false,
    hasNotes: true,
    hasExpiryDate: false,
  },
  pantry: {
    name: 'pages.listTemplates.pantry.name',
    description: 'pages.listTemplates.pantry.description',
    hasCheckbox: true,
    checkboxLabels: ['pages.listTemplates.pantry.checkboxLabel'],
    hasQuantity: true,
    hasUnit: true,
    hasNotes: true,
    hasExpiryDate: true,
  },
};

export const DEFAULT_FIELD_CONFIG: FieldConfig = {
  checkboxLabels: [],
  hasCheckbox: true,
  hasExpiryDate: false,
  hasNotes: false,
  hasPriority: false,
  hasQuantity: false,
  hasUnit: true,
  multipleCheckboxes: false,
};
