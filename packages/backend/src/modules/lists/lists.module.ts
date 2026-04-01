import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {List, ListSchema} from 'src/modules/lists/schemas/list.schema';
import {ListsService} from 'src/modules/lists/lists.service';

@Module({
  imports: [MongooseModule.forFeature([{name: List.name, schema: ListSchema}])],
  exports: [ListsService],
  providers: [ListsService],
})
export class ListsModule {}
