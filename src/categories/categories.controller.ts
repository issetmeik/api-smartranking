import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from './dtos/create-categorie.dto';
import { UpdateCategorieDto } from './dtos/update-categorie.dto';
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

    @Get(':categorie')
    async findOne(@Param('categorie') categorie: string) : Promise<Categorie> {
        return await this.categoriesService.getOne(categorie)
    }

    @Delete(':_id')
    async delete(@Param('_id') _id: string) : Promise<void> {
        return await this.categoriesService.delete(_id)
    }

    @Patch(':_id')
    @UsePipes(ValidationPipe)
    async update(@Body() updateCategorieDto: UpdateCategorieDto, @Param('_id') _id: string) : Promise<void> {
        return await this.categoriesService.update(updateCategorieDto, _id)
    }

    @Post(':categorie/players/:playerId')
    async linkCategoriePlayer(@Param() params: string[]) : Promise<void> {
        return await this.categoriesService.linkCategoriePlayer(params)    
    }

    
}
