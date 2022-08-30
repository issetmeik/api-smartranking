import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreatePlayerDto} from './dtos/create-player.dto'
import { PlayersService} from './players.service'
import { Player } from './interfaces/player.interface'

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto) {
    
        await this.playersService.createUpdatePlayer(createPlayerDto)
    }

    @Get()
    async findPlayers() : Promise<Player[]>{
        return this.playersService.getAll()
    }
}
