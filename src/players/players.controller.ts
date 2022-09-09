import { Controller, Post, Body, Get, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersValidationPipe } from '../common/pipes/validation.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto) : Promise<Player> {
    return await this.playersService.create(createPlayerDto);
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
  @UsePipes(ValidationPipe)
  async update(@Param('_id') _id: string, @Body() updatePlayerDto: UpdatePlayerDto) : Promise<void> {
    return this.playersService.update(updatePlayerDto, _id);
  }


  @Delete(':_id')
  async remove(@Param('_id',PlayersValidationPipe) _id: string) : Promise<void> {
    return this.playersService.delete(_id)
  }
}
