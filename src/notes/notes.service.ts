import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notes } from '../entities/notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  getAll(): Promise<Notes[]> {
    return this.notesRepository.find();
  }

  async getById(id: number) : Promise<Notes> {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new BadRequestException('something went wrong');
    }
    return note
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

  async remove(id: number): Promise<Notes> {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new BadRequestException('note does not exist');
    }
   return this.notesRepository.softRemove(note);
  }

  async edit(id: number, updateDto): Promise<Notes> {
    const note = await this.notesRepository.preload({ id, ...updateDto });
    if (!note) {
      throw new BadRequestException('note does not exist');
    }

    return this.notesRepository.save(note);
  }
}
