import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(updatePlayerDto, id);
  }
}
