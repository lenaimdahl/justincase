import type {FieldConfig} from 'src/api/lists';

export const LIST_ICONS = ['📝', '🛒', '👥', '🏠', '✈️', '🎉', '📚', '⚽', '🍽️', '🏋️', '🎵', '🌍'];

export const LIST_COLORS = ['#9c27b0', '#e91e63', '#f44336', '#ff9800', '#4caf50', '#2196f3', '#00bcd4', '#9e9e9e'];

export interface PresetTemplate {
  name: string;
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
    hasCheckbox: true,
    hasQuantity: true,
  },
  guestlist: {
    name: 'Gästeliste',
    hasCheckbox: true,
    multipleCheckboxes: true,
    checkboxLabels: ['Zugesagt', 'Abgesagt'],
  },
  packing: {
    name: 'Packliste',
    hasCheckbox: true,
  },
  pantry: {
    name: 'Vorratsschrank',
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
