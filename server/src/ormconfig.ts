import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envData: any = dotenv.parse(fs.readFileSync('.env'));
const config: ConnectionOptions = {
  type: envData.DB_TYPE,
  port: envData.DB_PORT,
  host: envData.DB_HOST,
  username: envData.DB_USERNAME,
  password: envData.DB_PASSWORD,
  database: envData.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
