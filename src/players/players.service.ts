import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async getAll(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getOne(_id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ _id }).exec();

    if (!player) {
      throw new NotFoundException(`Jogador com o id: ${_id} não encontrado.`);
    }

    return player;
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new BadRequestException(`e-mail: ${email} já foi cadastrado.`);
    }

    const newPlayer = new this.playerModel(createPlayerDto);

    return await newPlayer.save();
  }

  async update(updatePlayerDto: UpdatePlayerDto, _id: string): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Jogador com o id ${_id} não encontrado.`);
    }

    this.playerModel.updateOne({ _id }, { $set: updatePlayerDto }).exec();
  }

  async delete(_id: string): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Jogador com o id ${_id} não encontrado.`);
    }

    await this.playerModel.deleteOne({ _id }).exec();
  }
}
