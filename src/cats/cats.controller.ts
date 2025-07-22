import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { Messages } from 'src/common/messages';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiResponse } from 'src/common/types/api-response.type';
import { jsonApiResponse } from 'src/common/helpers/json-api-response.helper';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): ApiResponse<Cat[]> {
    const cats = this.catsService.findAll();
    return jsonApiResponse(true, Messages.list('Cat'), cats);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Cat> {
    const cat = this.catsService.findOne(id);
    return jsonApiResponse(true, Messages.fetched('Cat'), cat);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): ApiResponse<Cat> {
    const cat = this.catsService.create(createCatDto);
    return jsonApiResponse(true, Messages.created('Cat'), cat);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): ApiResponse<Cat> {
    const cat = this.catsService.update(id, updateCatDto);
    return jsonApiResponse(true, Messages.updated('Cat'), cat);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    this.catsService.delete(id);
    return jsonApiResponse(true, Messages.deleted('Cat'));
  }
}
