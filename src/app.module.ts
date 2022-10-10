import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Notes } from './database/database.entity';
import { NotesModule } from './notes/notes.module';


@Module({
  imports: [NotesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'user',
    password: 'password',
    database: 'db',
    entities: [Notes],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
