
import { DataSource } from "typeorm"
import { Notes } from "./database.entity";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory : async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3307,
                username: 'user',
                password: 'password',
                database: 'db',
                entities: [Notes],
                synchronize: true,
            });


            return dataSource.initialize()
        }
    }
]