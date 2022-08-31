import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto} from './dtos/create-player.dto';
import { UpdatePlayerDto} from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'


@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    private readonly logger = new Logger(PlayersService.name)

    async createPlayer(createPlayerDto: CreatePlayerDto) : Promise<void> {
        this.create(createPlayerDto)    
    }

    async getAll() : Promise<Player[]>{
        return await this.playerModel.find().exec()
    }

    async getOne(_id: string) : Promise<Player>{
        const player = await this.playerModel.findOne({_id}).exec()
        if(!player){
            throw new NotFoundException(`Player with _id: ${_id} not found.`)
        }
        return player
    }

    private async create(createPlayerDto: CreatePlayerDto) : Promise<Player> {
        const newPlayer = new this.playerModel(createPlayerDto)

        return await newPlayer.save()
    }

    async update(updatePlayerDto: UpdatePlayerDto, _id: string) : Promise<Player> {
        this.playerModel.updateOne({ _id }, {$set: updatePlayerDto }).exec()
        
        return this.getOne(_id)
    }

    async delete(_id: string) : Promise<any> {
        if(this.playerModel.remove({_id}).exec()){
            return 'true'
        }
    }

    

}
