import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from './dtos/create-categorie.dto';
import { Categorie } from './interfaces/categorie.interface';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}


    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createCategorieDto: CreateCategorieDto) : Promise<Categorie>{
        return await this.categoriesService.create(createCategorieDto)
    }

    @Get()
    async findAll(): Promise<Array<Categorie>>{
        return await this.categoriesService.getAll()
    }

    @Get(':_id')
    async findOne(@Param('_id') _id: string) : Promise<Categorie> {
        return await this.categoriesService.getOne(_id)
    }
}
