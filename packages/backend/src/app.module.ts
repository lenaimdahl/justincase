import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {APP_GUARD} from '@nestjs/core';
import {MongooseModule} from '@nestjs/mongoose';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {HealthController, UnderscoreHealthController} from 'src/controllers/health.controller';
import {ListsController} from 'src/controllers/lists.controller';
import {AuthModule} from 'src/modules/auth/auth.module';
import {JwtAuthGuard} from 'src/modules/auth/guards/jwt-auth.guard';
import {ItemsModule} from 'src/modules/items/items.module';
import {ListsModule} from 'src/modules/lists/lists.module';
import {UsersModule} from 'src/modules/users/users.module';

import {MainController} from './controllers/main.controller';

@Module({
  controllers: [HealthController, MainController, UnderscoreHealthController, ListsController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGODB_URI'),
      }),
    }),
    ThrottlerModule.forRoot([{limit: 60, ttl: 60000}]),
    AuthModule,
    UsersModule,
    ItemsModule,
    ListsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
