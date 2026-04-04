import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ListsService} from 'src/modules/lists/lists.service';
import {List, ListSchema} from 'src/modules/lists/schemas/list.schema';

@Module({
  exports: [ListsService],
  imports: [MongooseModule.forFeature([{name: List.name, schema: ListSchema}])],
  providers: [ListsService],
})
export class ListsModule {}
