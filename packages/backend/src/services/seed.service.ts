import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ListsService} from './lists.service';
import {SAMPLE_LISTS} from 'src/seeds/sample-data';

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
      this.logger.debug('🌱 Starting database seeding for list templates...');

      // Create sample lists
      for (const listData of SAMPLE_LISTS) {
        const list = this.listsService.create({
          name: listData.name,
          icon: listData.icon,
          color: listData.color,
          fieldConfig: listData.fieldConfig,
        });
        this.logger.debug(`✓ Created list: ${list.name} (${list.id})`);
      }

      // Get the created lists
      const allLists = this.listsService.findAll();

      // Log summary
      this.logger.debug('\n📊 Seeding Summary:');
      this.logger.debug('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.debug(`✓ Created ${allLists.length} list templates`);
      this.logger.debug('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      this.seeded = true;
    } catch (error) {
      this.logger.error('Seeding failed:', error);
    }
  }
}
