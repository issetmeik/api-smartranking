import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto} from './dtos/create-player.dto';
import { UpdatePlayerDto} from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import {v4 as uuidv4} from 'uuid'


@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name)

    async createPlayer(createPlayerDto: CreatePlayerDto) : Promise<void> {
        this.create(createPlayerDto)    
    }

    async getAll() : Promise<Player[]>{
        return await this.players
    }

    private create(createPlayerDto: CreatePlayerDto) : void {
        const { name, phoneNumber, email } = createPlayerDto

        const player: Player = {
            _id: uuidv4(),
            name,
            email,
            phoneNumber,
            ranking: 'A',
            rankingPosition: 1,
            profilePictureUrl: 'www.google.com.br/picture123.jpg'
        }
        this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`)
        this.players.push(player)
    }

    update(updatePlayerDto: UpdatePlayerDto, _id: string) : void {
        const { name } = updatePlayerDto
        
        const playerFound = this.players.find(player => player._id === _id)
        if(playerFound){
            playerFound.name = name
        }

    }

}
