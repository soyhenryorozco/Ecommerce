import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    OrdersModule,
    CategoriesModule,
    FileUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
