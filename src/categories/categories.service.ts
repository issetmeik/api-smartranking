import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categorie } from './interfaces/categorie.interface';
import { Model } from 'mongoose'
import { CreateCategorieDto } from './dtos/create-categorie.dto';
import { UpdateCategorieDto } from './dtos/update-categorie.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Categorie') private readonly categorieModel: Model<Categorie>,
    private readonly playersService: PlayersService){}

    async create(createCategorieDto: CreateCategorieDto) : Promise<Categorie>{

        const { categorie } = createCategorieDto

        const categorieFound = await this.categorieModel.findOne({categorie}).exec()

        if(categorieFound){
            throw new BadRequestException(`categoria: ${categorie} já cadastrada!`)
        }

        const newCategorie = new this.categorieModel(createCategorieDto)

        return await newCategorie.save()
    }

    async getAll() : Promise<Array<Categorie>>{
        return await this.categorieModel.find().populate("players").exec()
    }

    async getOne(categorie: string) : Promise<Categorie> {
        const categorieFound = await this.categorieModel.findOne({categorie}).exec() 
        if(!categorieFound){
            throw new NotFoundException(`Categoria: ${categorie} inválida. Nenhuma categoria foi encontrada!`)
        }

        return categorieFound
    }

    async delete(_id: string) : Promise<void> {
        const categorie = await this.categorieModel.findOne({_id}).exec()
        if(!categorie){
            throw new NotFoundException(`id: ${_id} inválido. Nenhuma categoria foi encontrada!`)
        }

        await this.categorieModel.deleteOne({_id}).exec()
    }

    async update(updateCategorieDto: UpdateCategorieDto, _id: string) : Promise<void> {
        const categorie = await this.categorieModel.findOne({_id}).exec()
        if(!categorie){
            throw new NotFoundException(`id: ${_id} inválido. Nenhuma categoria foi encontrada!`)
        }

        await this.categorieModel.findOneAndUpdate({_id}, {$set: updateCategorieDto}).exec()
    }

    async linkCategoriePlayer(params: string[]) : Promise<void> {
        const categorie = params['categorie']
        const playerId = params['playerId']

        await this.playersService.getOne(playerId)

        const categorieFound = await this.categorieModel.findOne({categorie}).exec()

        const categoriePlayer = await this.categorieModel.find({categorie}).where('players').in(playerId)

        if(!categorieFound){
            throw new NotFoundException(`categoria: ${categorie} não cadastrada!`)
        }

        if(categoriePlayer.length > 0){
            throw new BadRequestException(`Jogador: ${playerId} já está cadastrado na Categoria ${categorie}.`)
        }

        

        categorieFound.players.push(playerId)

        await this.categorieModel.findOneAndUpdate({categorie}, {$set: categorieFound}).exec()

    }


}
