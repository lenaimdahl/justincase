/**
 * Database seeding script for JustInCase
 * Creates sample list templates (no items)
 *
 * Usage: npx ts-node src/seeds/seed.ts
 */

import 'dotenv/config';
import {MongoClient} from 'mongodb';
import {SAMPLE_LISTS} from './sample-data';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/justincase';

async function seed() {
  let client: MongoClient | null = null;

  try {
    console.log('🌱 Starting database seeding...');
    console.log(`📍 Connecting to MongoDB: ${MONGODB_URI}`);

    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db();
    const listsCollection = db.collection('lists');

    // Clear existing lists
    console.log('🗑️  Clearing existing lists...');
    const deleteResult = await listsCollection.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} lists`);

    // Insert sample lists
    console.log(`\n📝 Creating ${SAMPLE_LISTS.length} list templates...`);
    const insertResult = await listsCollection.insertMany(SAMPLE_LISTS);
    console.log(`   ✓ Created ${insertResult.insertedCount} lists`);

    // Log summary
    console.log('\n📊 Seeding Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    for (const list of SAMPLE_LISTS) {
      console.log(`${list.icon} ${list.name}`);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n✅ Seeding completed successfully!\n` + `   - List templates created: ${SAMPLE_LISTS.length}`);
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
