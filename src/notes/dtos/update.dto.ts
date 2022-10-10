import { PartialType } from "@nestjs/mapped-types";
import { NoteDto } from "./note.dto";


export class UpdateDto extends PartialType(NoteDto){}