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
    checkboxLabels: ['Zugesagt'],
    description: 'Mit Zusagen und Absagen',
    hasCheckbox: true,
    hasNotes: false,
    hasQuantity: true,
    hasUnit: false,
    name: 'Gästeliste',
  },
  packing: {
    checkboxLabels: ['Packed'],
    description: 'Mit Häkchen und Kommentaren',
    hasCheckbox: true,
    hasExpiryDate: false,
    hasNotes: true,
    hasQuantity: true,
    hasUnit: false,
    name: 'Packliste',
  },
  pantry: {
    checkboxLabels: ['Refill'],
    description: 'Mit Verfallsdaten und Kommentaren',
    hasCheckbox: true,
    hasExpiryDate: true,
    hasNotes: true,
    hasQuantity: true,
    hasUnit: true,
    name: 'Vorratsschrank',
  },
  shopping: {
    checkboxLabels: ['Refilled'],
    description: 'Mit Mengen und Kommentaren',
    hasCheckbox: true,
    hasExpiryDate: false,
    hasNotes: true,
    hasQuantity: true,
    hasUnit: true,
    name: 'Einkaufsliste',
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
