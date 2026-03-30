/**
 * Database seeding script for JustInCase
 * Creates sample lists and items for testing
 *
 * Usage: npx ts-node src/seeds/seed.ts
 */

import 'dotenv/config';
import {MongoClient} from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/justincase';

interface Item {
  listId: string;
  name: string;
  quantity: number;
  unit?: string;
  expiryDate?: Date;
  comment?: string;
}

// Sample lists configuration
const SAMPLE_LISTS = [
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

// Sample items
const SAMPLE_ITEMS: Item[] = [
  // Pantry items
  {
    listId: '1',
    name: 'Pasta',
    quantity: 2,
    unit: 'packages',
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
    comment: 'Whole wheat',
  },
  {
    listId: '1',
    name: 'Rice',
    quantity: 1,
    unit: 'kg',
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
  },
  {
    listId: '1',
    name: 'Olive Oil',
    quantity: 1,
    unit: 'liter',
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    comment: 'Extra virgin',
  },
  {
    listId: '1',
    name: 'Canned Tomatoes',
    quantity: 4,
    unit: 'cans',
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
  },
  {
    listId: '1',
    name: 'Flour',
    quantity: 2,
    unit: 'kg',
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 2 months from now
  },

  // Fridge items
  {
    listId: '2',
    name: 'Milk',
    quantity: 2,
    unit: 'liters',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
  },
  {
    listId: '2',
    name: 'Butter',
    quantity: 1,
    unit: 'package',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
  },
  {
    listId: '2',
    name: 'Cheese',
    quantity: 1,
    unit: 'package',
    expiryDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
  },
  {
    listId: '2',
    name: 'Yogurt',
    quantity: 6,
    unit: 'pieces',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
  },
  {
    listId: '2',
    name: 'Lettuce',
    quantity: 1,
    unit: 'head',
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    comment: 'Needs soon',
  },

  // Freezer items
  {
    listId: '3',
    name: 'Frozen Vegetables',
    quantity: 3,
    unit: 'bags',
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
  },
  {
    listId: '3',
    name: 'Chicken Breast',
    quantity: 2,
    unit: 'packages',
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
  },
  {
    listId: '3',
    name: 'Ice Cream',
    quantity: 1,
    unit: 'liter',
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
  },
];

async function seed() {
  let client: MongoClient | null = null;

  try {
    console.log('🌱 Starting database seeding...');
    console.log(`📍 Connecting to MongoDB: ${MONGODB_URI}`);

    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db();
    const itemsCollection = db.collection('items');

    // Clear existing items
    console.log('🗑️  Clearing existing items...');
    const deleteResult = await itemsCollection.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} items`);

    // Insert sample items
    console.log(`\n📝 Creating ${SAMPLE_ITEMS.length} sample items...`);
    const insertResult = await itemsCollection.insertMany(SAMPLE_ITEMS);
    console.log(`   ✓ Created ${insertResult.insertedCount} items`);

    // Log summary
    console.log('\n📊 Seeding Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const list of SAMPLE_LISTS) {
      const itemCount = SAMPLE_ITEMS.filter(item => item.listId === list.id).length;
      console.log(`${list.icon} ${list.name}: ${itemCount} items`);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(
      `\n✅ Seeding completed successfully!\n` +
        `   - Total lists: ${SAMPLE_LISTS.length}\n` +
        `   - Total items: ${SAMPLE_ITEMS.length}`
    );

    console.log('\n💡 Note: Application lists are stored in-memory and will be');
    console.log('   created automatically when needed via the UI.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seed();
}
