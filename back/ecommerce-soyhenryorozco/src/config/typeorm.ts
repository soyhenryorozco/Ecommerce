import { registerAs } from '@nestjs/config';
import { config as dotenvconfig } from 'dotenv';

dotenvconfig({ path: '.development.env' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  // dropSchema: true,
  logging: true,
};

export default registerAs('typeorm', () => config);
