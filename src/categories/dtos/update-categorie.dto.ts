import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Event } from "../interfaces/categorie.interface"


export class UpdateCategorieDto {

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(1)
    events: Array<Event>;



}