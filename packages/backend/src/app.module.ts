import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {HealthController, UnderscoreHealthController} from 'src/controllers/health.controller';
import {ListsController} from 'src/controllers/lists.controller';
import {ItemsModule} from 'src/modules/items/items.module';
import {ListsService} from 'src/services/lists.service';
import {MainController} from './controllers/main.controller';

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
  controllers: [HealthController, MainController, UnderscoreHealthController, ListsController],
  providers: [ListsService],
})
export class AppModule {}
