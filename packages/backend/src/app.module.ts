import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app.controller';
import { HealthController, UnderscoreHealthController } from 'src/controllers/health.controller';
import { ListsController } from 'src/controllers/lists.controller';
import { ItemsModule } from 'src/modules/items/items.module';
import { AppService } from 'src/services/app.service';
import { ListsService } from 'src/services/lists.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGODB_URI'),
      }),
    }),
    ItemsModule,
  ],
  controllers: [AppController, HealthController, UnderscoreHealthController, ListsController],
  providers: [AppService, ListsService],
})
export class AppModule {}
