import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Challenge } from './interfaces/challenge.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { PlayersService } from '../players/players.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<any> {
    const { players, requester } = createChallengeDto;
    const requesterFound = await this.playersService.getOne(requester.id);
    const playerOne = await this.playersService.getOne(players[0].id);
    const playerTwo = await this.playersService.getOne(players[1].id);

    if (requester.id != players[0].id && players[1].id != requester.id) {
      throw new BadRequestException(
        `O desafiante não faz parte do array dos jogadores
        requester: ${requesterFound._id}, playerOne: ${playerOne._id}, playerTwo: ${playerTwo._id}`,
      );
    }
  }
}
