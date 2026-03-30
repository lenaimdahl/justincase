import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ListsService, List, FieldConfig} from './lists.service';

interface SampleItem {
  listId: string;
  name: string;
  quantity: number;
  unit?: string;
  expiryDate?: Date;
  comment?: string;
}

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);
  private seeded = false;

  constructor(private readonly listsService: ListsService) {}

  async onModuleInit() {
    if (process.env.NODE_ENV !== 'development') {
      this.logger.debug('Skipping seed in production');
      return;
    }

    await this.seed();
  }

  private async seed() {
    if (this.seeded) {
      return;
    }

    try {
      this.logger.debug('🌱 Starting database seeding...');

      const sampleLists = this.getSampleLists();

      // Create sample lists
      for (const listData of sampleLists) {
        const list = this.listsService.create({
          name: listData.name,
          icon: listData.icon,
          color: listData.color,
          fieldConfig: listData.fieldConfig,
        });
        this.logger.debug(`✓ Created list: ${list.name} (${list.id})`);
      }

      // Get the created lists to add items
      const allLists = this.listsService.findAll();
      const sampleItems = this.getSampleItems();

      // Log summary
      this.logger.debug('\n📊 Seeding Summary:');
      this.logger.debug('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.debug(`✓ Created ${allLists.length} sample lists`);
      this.logger.debug(`✓ Ready with ${sampleItems.length} sample items`);
      this.logger.debug('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      this.seeded = true;
    } catch (error) {
      this.logger.error('Seeding failed:', error);
    }
  }

  private getSampleLists(): Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    fieldConfig: FieldConfig;
  }> {
    return [
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
  }

  private getSampleItems(): SampleItem[] {
    return [
      // Pantry items
      {
        listId: '1',
        name: 'Pasta',
        quantity: 2,
        unit: 'packages',
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        comment: 'Whole wheat',
      },
      {
        listId: '1',
        name: 'Rice',
        quantity: 1,
        unit: 'kg',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '1',
        name: 'Olive Oil',
        quantity: 1,
        unit: 'liter',
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        comment: 'Extra virgin',
      },
      {
        listId: '1',
        name: 'Canned Tomatoes',
        quantity: 4,
        unit: 'cans',
        expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '1',
        name: 'Flour',
        quantity: 2,
        unit: 'kg',
        expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },

      // Fridge items
      {
        listId: '2',
        name: 'Milk',
        quantity: 2,
        unit: 'liters',
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '2',
        name: 'Butter',
        quantity: 1,
        unit: 'package',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '2',
        name: 'Cheese',
        quantity: 1,
        unit: 'package',
        expiryDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '2',
        name: 'Yogurt',
        quantity: 6,
        unit: 'pieces',
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '2',
        name: 'Lettuce',
        quantity: 1,
        unit: 'head',
        expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        comment: 'Needs soon',
      },

      // Freezer items
      {
        listId: '3',
        name: 'Frozen Vegetables',
        quantity: 3,
        unit: 'bags',
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '3',
        name: 'Chicken Breast',
        quantity: 2,
        unit: 'packages',
        expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      },
      {
        listId: '3',
        name: 'Ice Cream',
        quantity: 1,
        unit: 'liter',
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    ];
  }
}
