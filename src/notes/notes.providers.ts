import { DataSource } from 'typeorm';
import { Notes } from '../database/database.entity';

export const notesProviders = [
  {
    provide: 'NOTES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Notes),
    inject: ['DATA_SOURCE'],
  },
];