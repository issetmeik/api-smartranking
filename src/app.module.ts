import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot('mongodb+srv://tavares:87361318@cluster0.dydo38f.mongodb.net/smartranking?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true}),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
