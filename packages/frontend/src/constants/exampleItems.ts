import type {Item} from 'src/types/item';

export interface ExampleList {
  color: string;
  icon: string;
  id: string;
  name: string;
  nameKey: string;
}

/**
 * Example lists for home page demonstration
 * nameKey is used for i18n translations
 */
export const EXAMPLE_LISTS: ExampleList[] = [
  {
    color: '#4CAF50',
    icon: '🛒',
    id: 'example-shopping',
    name: 'Shopping List',
    nameKey: 'pages.exampleLists.shopping',
  },
  {
    color: '#E91E63',
    icon: '👥',
    id: 'example-guests',
    name: 'Guest List',
    nameKey: 'pages.exampleLists.guests',
  },
  {
    color: '#2196F3',
    icon: '🎒',
    id: 'example-packing',
    name: 'Packing List',
    nameKey: 'pages.exampleLists.packing',
  },
  {
    color: '#FF9800',
    icon: '🗄️',
    id: 'example-pantry',
    name: 'Pantry',
    nameKey: 'pages.exampleLists.pantry',
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
    comment: 'Best before min. 1 week',
    listId: 'example-shopping',
    name: 'Milk',
    quantity: 1,
    unit: 'L',
  },
  {
    _id: 'example-shopping-2',
    comment: 'Whole wheat',
    listId: 'example-shopping',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
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
    checked: 1,
    listId: 'example-guests',
    name: 'Anna Mueller',
    quantity: 1,
  },
  {
    _id: 'example-guests-2',
    checked: 1,
    listId: 'example-guests',
    name: 'Tom Schmidt',
    quantity: 4,
  },
  {
    _id: 'example-guests-3',
    listId: 'example-guests',
    name: 'Lisa Weber',
    quantity: 1,
  },

  // Packing List - items to pack
  {
    _id: 'example-packing-1',
    comment: 'T-shirts and pants',
    listId: 'example-packing',
    name: 'Clothes',
    quantity: 5,
    unit: 'items',
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
    comment: 'Passport, tickets, insurance',
    listId: 'example-packing',
    name: 'Documents',
    quantity: 1,
    unit: 'set',
  },

  // Pantry - items with expiry dates showing all statuses
  {
    _id: 'example-pantry-fresh',
    comment: 'Fresh - long shelf life',
    expiryDate: '2026-09-30',
    listId: 'example-pantry',
    name: 'Flour',
    quantity: 2,
    unit: 'kg',
  },
  {
    _id: 'example-pantry-warning',
    comment: 'Warning - expires in 5 days',
    expiryDate: '2026-04-05',
    listId: 'example-pantry',
    name: 'Yogurt',
    quantity: 4,
    unit: 'cups',
  },
  {
    _id: 'example-pantry-expired',
    comment: 'Expired - needs replacing',
    expiryDate: '2026-03-20',
    listId: 'example-pantry',
    name: 'Ketchup',
    quantity: 1,
    unit: 'bottle',
  },
];
