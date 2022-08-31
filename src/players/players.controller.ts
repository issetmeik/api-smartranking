import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playersService.getAll();
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string) : Promise<Player> {
    return this.playersService.getOne(_id);
  }

  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(updatePlayerDto, _id);
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string) : Promise<void> {
    return this.playersService.delete(_id)
  }
}
