import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categorie } from './interfaces/categorie.interface';
import { Model } from 'mongoose'
import { CreateCategorieDto } from './dtos/create-categorie.dto';
import { throwIfEmpty } from 'rxjs';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Categorie') private readonly categorieModel: Model<Categorie>){}

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
        return await this.categorieModel.find().exec()
    }

    async getOne(_id: string) : Promise<Categorie> {
        const categorie = await this.categorieModel.findOne({_id}).exec() 
        if(!categorie){
            throw new NotFoundException(`id: ${_id} inválido. Nenhuma categoria foi encontrada!`)
        }

        return categorie
    }




}
