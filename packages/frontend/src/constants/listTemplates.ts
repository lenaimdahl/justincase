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
  guestlist: {
    checkboxLabels: ['pages.listTemplates.guestlist.checkboxLabel'],
    description: 'pages.listTemplates.guestlist.description',
    hasCheckbox: true,
    hasNotes: false,
    hasQuantity: true,
    hasUnit: false,
    name: 'pages.listTemplates.guestlist.name',
  },
  packing: {
    checkboxLabels: ['pages.listTemplates.packing.checkboxLabel'],
    description: 'pages.listTemplates.packing.description',
    hasCheckbox: true,
    hasExpiryDate: false,
    hasNotes: true,
    hasQuantity: true,
    hasUnit: false,
    name: 'pages.listTemplates.packing.name',
  },
  pantry: {
    checkboxLabels: ['pages.listTemplates.pantry.checkboxLabel'],
    description: 'pages.listTemplates.pantry.description',
    hasCheckbox: true,
    hasExpiryDate: true,
    hasNotes: true,
    hasQuantity: true,
    hasUnit: true,
    name: 'pages.listTemplates.pantry.name',
  },
  shopping: {
    checkboxLabels: ['pages.listTemplates.shopping.checkboxLabel'],
    description: 'pages.listTemplates.shopping.description',
    hasCheckbox: true,
    hasExpiryDate: false,
    hasNotes: true,
    hasQuantity: true,
    hasUnit: true,
    name: 'pages.listTemplates.shopping.name',
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
