import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Request,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';

import { UsersService } from './user.service';
import { ApiResponse } from 'src/common/types/api-response.type';
import { User } from 'src/typeorm/entities/user.entity';
import { jsonApiResponse } from 'src/common/helpers/json-api-response.helper';
import { Messages } from 'src/common/messages';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('users')
export class UserController {
    constructor(
        private readonly usersService: UsersService,
        private readonly roleService: RoleService
    ) { }

    @Get()
    async findAll(@Request() req): Promise<ApiResponse<User[]>> {
        const users = await this.usersService.findAll(req.user.organization_id, req.user.id);
        return jsonApiResponse(true, Messages.fetched('Users'), users);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiResponse<User>> {
        const user = await this.usersService.findOne(id);
        return jsonApiResponse(true, Messages.fetched('User'), user);
    }

    @Post()
    async create(
        @Request() req,
        @Body() dto: CreateUserDto,
    ): Promise<ApiResponse<User>> {
        const role = await this.roleService.findByName(dto.role);
        if (!role) throw new NotFoundException('Role not found');

        await this.usersService.create({
            name: dto.name, 
            email: dto.email,
            organization_id: req.user.organization_id,
            role_id: role.id,
        });

        return jsonApiResponse(true, Messages.created('User'));
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<ApiResponse<void>> {
        const { name, email, role } = dto;

        let updateData: any = { name, email };
      
        if (role) {
          const roleEntity = await this.roleService.findByName(role);
          if (!roleEntity) throw new NotFoundException('Role not found');
          updateData.role_id = roleEntity.id;
        }
      
        await this.usersService.update(id, updateData);
        return jsonApiResponse(true, Messages.updated('User'));
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
        await this.usersService.remove(id);
        return jsonApiResponse(true, Messages.deleted('User'));
    }
}
