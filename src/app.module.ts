import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // CatsModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule { }
