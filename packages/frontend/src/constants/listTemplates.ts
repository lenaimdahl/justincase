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
  hasNotes?: boolean;
  hasPriority?: boolean;
}

export const PRESET_TEMPLATES: Record<string, PresetTemplate> = {
  shopping: {
    name: 'Einkaufsliste',
    description: 'Mit Häkchen und Mengen',
    hasCheckbox: true,
    hasQuantity: true,
    hasExpiryDate: false,
  },
  guestlist: {
    name: 'Gästeliste',
    description: 'Mit Zusagen und Absagen',
    hasCheckbox: true,
    multipleCheckboxes: true,
    checkboxLabels: ['Zugesagt', 'Abgesagt'],
  },
  packing: {
    name: 'Packliste',
    description: 'Mit Häkchen zum Abhaken',
    hasCheckbox: true,
    hasExpiryDate: false,
  },
  pantry: {
    name: 'Vorratsschrank',
    description: 'Mit Verfallsdaten und Mengen',
    hasQuantity: true,
    hasExpiryDate: true,
  },
};

export const DEFAULT_FIELD_CONFIG: FieldConfig = {
  hasCheckbox: true,
  multipleCheckboxes: false,
  checkboxLabels: [],
  hasExpiryDate: false,
  hasQuantity: false,
  hasNotes: false,
  hasPriority: false,
};
