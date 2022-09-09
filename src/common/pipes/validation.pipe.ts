import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { PlayersService } from '../../players/players.service';

export class PlayersValidationPipe implements PipeTransform{
    constructor(private readonly playersService: PlayersService) {}
    transform (value: any, metadata: ArgumentMetadata) {


        if(!value) {
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
        }
        
        return value
    }
}