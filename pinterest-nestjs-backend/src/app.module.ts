import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { NguoiDung } from './nguoi-dung/entities/nguoi-dung.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'picturest',
      entities: [NguoiDung],
      synchronize: true,
    }),
    ,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    NguoiDungModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
