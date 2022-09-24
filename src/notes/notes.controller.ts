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
import { NoteDto } from './dtos/note.dto';
import { NotesService } from './notes.service';


@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes() {
    return this.notesService.getAll();
  }

  @Get('/:id')
  getNote(@Param('id') id: string) {
    return this.notesService.getById(parseInt(id));
  }

  @Post()
  addNote(@Body() body: NoteDto) {
    return this.notesService.add(body.title, body.content);
    
  }

  @Delete('/:id')
  @HttpCode(204)
  removeNote(@Param('id') id: string) {
    return this.notesService.remove(parseInt(id));
  }

  @Patch('/:id')
  editNote(@Body() body: NoteDto, @Param('id') id: string) {
    return this.notesService.edit(+id, body.content, body.title);
  }
}
