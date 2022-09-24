import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notes } from '../database/database.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY') private notesRepository: Repository<Notes>,
  ) {}

  async findAll(): Promise<Notes[]> {
    return this.notesRepository.find();
  }

  getAll() {
    return this.notesRepository.find();
  }

  async getById(id: number) {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new BadRequestException('something went wrong');
    }
    return this.notesRepository.findOne({ where: { id: id } });
  }

  async add(title: string, content: string): Promise<Notes> {
    const note = await this.notesRepository.findOne({ where: { title } });
    if (note) {
      throw new BadRequestException(`Note with title ${title} already exists`);
    }
    return this.notesRepository.save(
      this.notesRepository.create({ title, content }),
    );
  }

  async remove(id: number) {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new BadRequestException('note does not exist');
    }
    this.notesRepository.softRemove(note);
  }

  async edit(id: number, title: string, content: string) {
    const note = await this.notesRepository.findOne({ where: { id: id } });
    if (!note) {
      throw new BadRequestException('note does not exist');
    }
    note.title = title;
    note.content = content;
    return await this.notesRepository.save(note);
  }
}
