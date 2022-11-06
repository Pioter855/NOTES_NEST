import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

  const databaseConfig: DataSourceOptions={
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_DB'),
  entities: ['./**/*.entity.js'],
  synchronize: false,
  migrations: [__dirname + '/../src/migrations/*.js'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  logging: true,
  
}


export default databaseConfig;

