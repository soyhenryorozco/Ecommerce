import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './dtos/users.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Permite obtener todos los usuarios //
   * Necesitas estar logueado y ser administrador
   */

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.usersService.getUsers(page, limit);
    }
    return this.usersService.getUsers(1, 5);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   return this.usersService.createUser(user);
  // }

  // @Put(':id')
  // updateUser(@Param('id') id: string, @Body() user: any) {
  //   return this.usersService.updateUser(id, user);
  // }

//   @Delete(':id')
//   deleteUser(@Param('id') id: string) {
//     return this.usersService.deleteUser(id);
//   }
}
