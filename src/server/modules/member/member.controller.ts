import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/request/create-member.dto';
import { UpdateMemberDto } from './dto/request/update-member.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('member')
@Controller('api/member')
export class MemberController {
  constructor(private readonly service: MemberService) {}

  @Post()
  create(@Body() createDto: CreateMemberDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMemberDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
