import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateDto } from './dtos/update.dto';
import { NoteDto } from './dtos/note.dto';
import { NotesService } from './notes.service';
import { Notes } from '../entities/notes.entity';


@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes() : Promise<Notes[]>{
    return this.notesService.getAll();
  }

  @Get('/:id')
  getNote(@Param('id') id: number) : Promise<Notes> {
    return this.notesService.getById(id);
  }

  @Post()
  addNote(@Body() body: NoteDto) : Promise<Notes> {
    return this.notesService.add(body.title, body.content);
    
  }

  @Delete('/:id')
  @HttpCode(204)
  removeNote(@Param('id') id: number): Promise<Notes> {
    return this.notesService.remove(id);
  }

  @Patch('/:id')
  editNote(@Body() updateDto: UpdateDto, @Param('id') id: number): Promise<Notes> {
    return this.notesService.edit(id, updateDto);
  }
}
