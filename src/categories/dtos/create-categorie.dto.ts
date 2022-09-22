import {
  ArrayMinSize,
  IsAlphanumeric,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @IsNotEmpty()
  readonly categorie: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
