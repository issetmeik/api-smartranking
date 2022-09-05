import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto{

    @IsNotEmpty()
    phoneNumber: string;

    name: string;

    @IsEmail()
    email: string;
    
}