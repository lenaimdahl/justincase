import type {Item} from 'src/types/item';

export interface ExampleList {
  id: string;
  name: string;
  nameKey: string;
  icon: string;
  color: string;
}

/**
 * Example lists for home page demonstration
 * nameKey is used for i18n translations
 */
export const EXAMPLE_LISTS: ExampleList[] = [
  {
    id: 'example-shopping',
    name: 'Shopping List',
    nameKey: 'pages.exampleLists.shopping',
    icon: '🛒',
    color: '#4CAF50',
  },
  {
    id: 'example-guests',
    name: 'Guest List',
    nameKey: 'pages.exampleLists.guests',
    icon: '👥',
    color: '#E91E63',
  },
  {
    id: 'example-packing',
    name: 'Packing List',
    nameKey: 'pages.exampleLists.packing',
    icon: '🎒',
    color: '#2196F3',
  },
  {
    id: 'example-pantry',
    name: 'Pantry',
    nameKey: 'pages.exampleLists.pantry',
    icon: '🗄️',
    color: '#FF9800',
  },
];

/**
 * Example items to demonstrate different list types on home page
 * Each list shows how that template type would be used
 */
export const EXAMPLE_ITEMS: Item[] = [
  // Shopping List - items to buy
  {
    _id: 'example-shopping-1',
    listId: 'example-shopping',
    name: 'Milk',
    quantity: 1,
    unit: 'L',
    comment: 'Best before min. 1 week',
  },
  {
    _id: 'example-shopping-2',
    listId: 'example-shopping',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    comment: 'Whole wheat',
  },
  {
    _id: 'example-shopping-3',
    listId: 'example-shopping',
    name: 'Apples',
    quantity: 2,
    unit: 'kg',
  },

  // Guest List - people attending with confirmation status
  {
    _id: 'example-guests-1',
    listId: 'example-guests',
    name: 'Anna Mueller',
    quantity: 1,
    unit: 'Person',
    comment: '✓',
  },
  {
    _id: 'example-guests-2',
    listId: 'example-guests',
    name: 'Tom Schmidt',
    quantity: 4,
    unit: 'People',
    comment: '✓',
  },
  {
    _id: 'example-guests-3',
    listId: 'example-guests',
    name: 'Lisa Weber',
    quantity: 1,
    unit: 'Person',
  },

  // Packing List - items to pack
  {
    _id: 'example-packing-1',
    listId: 'example-packing',
    name: 'Clothes',
    quantity: 5,
    unit: 'items',
    comment: 'T-shirts and pants',
  },
  {
    _id: 'example-packing-2',
    listId: 'example-packing',
    name: 'Toothbrush',
    quantity: 1,
    unit: 'pcs',
  },
  {
    _id: 'example-packing-3',
    listId: 'example-packing',
    name: 'Documents',
    quantity: 1,
    unit: 'set',
    comment: 'Passport, tickets, insurance',
  },

  // Pantry - items with expiry dates showing all statuses
  {
    _id: 'example-pantry-fresh',
    listId: 'example-pantry',
    name: 'Flour',
    quantity: 2,
    unit: 'kg',
    expiryDate: '2026-09-30',
    comment: 'Fresh - long shelf life',
  },
  {
    _id: 'example-pantry-warning',
    listId: 'example-pantry',
    name: 'Yogurt',
    quantity: 4,
    unit: 'cups',
    expiryDate: '2026-04-05',
    comment: 'Warning - expires in 5 days',
  },
  {
    _id: 'example-pantry-expired',
    listId: 'example-pantry',
    name: 'Ketchup',
    quantity: 1,
    unit: 'bottle',
    expiryDate: '2026-03-20',
    comment: 'Expired - needs replacing',
  },
];
