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

export interface ExampleItem extends Omit<Item, 'comment' | 'name'> {
  commentKey?: string;
  nameKey: string;
}

/**
 * Example items to demonstrate different list types on home page
 * name/comment hold i18n keys (see pages.exampleItems in the locale files), translated in ExampleItemsShowcase
 */
export const EXAMPLE_ITEMS: ExampleItem[] = [
  // Shopping List - items to buy
  {
    _id: 'example-shopping-1',
    commentKey: 'pages.exampleItems.shoppingMilkComment',
    listId: 'example-shopping',
    nameKey: 'pages.exampleItems.shoppingMilk',
    quantity: 1,
    unit: 'L',
  },
  {
    _id: 'example-shopping-2',
    commentKey: 'pages.exampleItems.shoppingBreadComment',
    listId: 'example-shopping',
    nameKey: 'pages.exampleItems.shoppingBread',
    quantity: 1,
    unit: 'loaf',
  },
  {
    _id: 'example-shopping-3',
    listId: 'example-shopping',
    nameKey: 'pages.exampleItems.shoppingApples',
    quantity: 2,
    unit: 'kg',
  },

  // Guest List - people attending with confirmation status
  {
    _id: 'example-guests-1',
    checked: 1,
    listId: 'example-guests',
    nameKey: 'pages.exampleItems.guestAnna',
    quantity: 1,
  },
  {
    _id: 'example-guests-2',
    checked: 1,
    listId: 'example-guests',
    nameKey: 'pages.exampleItems.guestTom',
    quantity: 4,
  },
  {
    _id: 'example-guests-3',
    listId: 'example-guests',
    nameKey: 'pages.exampleItems.guestLisa',
    quantity: 1,
  },

  // Packing List - items to pack
  {
    _id: 'example-packing-1',
    commentKey: 'pages.exampleItems.packingClothesComment',
    listId: 'example-packing',
    nameKey: 'pages.exampleItems.packingClothes',
    quantity: 5,
    unit: 'items',
  },
  {
    _id: 'example-packing-2',
    listId: 'example-packing',
    nameKey: 'pages.exampleItems.packingToothbrush',
    quantity: 1,
    unit: 'pcs',
  },
  {
    _id: 'example-packing-3',
    commentKey: 'pages.exampleItems.packingDocumentsComment',
    listId: 'example-packing',
    nameKey: 'pages.exampleItems.packingDocuments',
    quantity: 1,
    unit: 'set',
  },

  // Pantry - items with expiry dates showing all statuses
  {
    _id: 'example-pantry-fresh',
    commentKey: 'pages.exampleItems.pantryFlourComment',
    expiryDate: '2026-09-30',
    listId: 'example-pantry',
    nameKey: 'pages.exampleItems.pantryFlour',
    quantity: 2,
    unit: 'kg',
  },
  {
    _id: 'example-pantry-warning',
    commentKey: 'pages.exampleItems.pantryYogurtComment',
    expiryDate: '2026-04-05',
    listId: 'example-pantry',
    nameKey: 'pages.exampleItems.pantryYogurt',
    quantity: 4,
    unit: 'cups',
  },
  {
    _id: 'example-pantry-expired',
    commentKey: 'pages.exampleItems.pantryKetchupComment',
    expiryDate: '2026-03-20',
    listId: 'example-pantry',
    nameKey: 'pages.exampleItems.pantryKetchup',
    quantity: 1,
    unit: 'bottle',
  },
];
