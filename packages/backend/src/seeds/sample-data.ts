/**
 * Shared sample data for seeding
 * List templates only (no sample items)
 */

export const SAMPLE_LISTS = [
  {
    id: '1',
    name: 'Pantry',
    icon: '🥫',
    color: '#FF9800',
    fieldConfig: {
      hasCheckbox: false,
      multipleCheckboxes: false,
      checkboxLabels: [],
      hasExpiryDate: true,
      hasQuantity: true,
      hasNotes: true,
      hasPriority: false,
    },
  },
  {
    id: '2',
    name: 'Fridge',
    icon: '❄️',
    color: '#2196F3',
    fieldConfig: {
      hasCheckbox: false,
      multipleCheckboxes: false,
      checkboxLabels: [],
      hasExpiryDate: true,
      hasQuantity: true,
      hasNotes: true,
      hasPriority: false,
    },
  },
  {
    id: '3',
    name: 'Freezer',
    icon: '🧊',
    color: '#00BCD4',
    fieldConfig: {
      hasCheckbox: false,
      multipleCheckboxes: false,
      checkboxLabels: [],
      hasExpiryDate: true,
      hasQuantity: true,
      hasNotes: false,
      hasPriority: false,
    },
  },
];
