import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/services/app.service';
import { HealthController } from 'src/controllers/health.controller';
import { ListsController } from 'src/controllers/lists.controller';
import { ListsService } from 'src/services/lists.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, HealthController, ListsController],
  providers: [AppService, ListsService],
})
export class AppModule {}
