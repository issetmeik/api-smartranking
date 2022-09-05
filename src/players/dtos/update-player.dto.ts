import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdatePlayerDto{

    @IsNotEmpty()
    readonly name: string;
  
}