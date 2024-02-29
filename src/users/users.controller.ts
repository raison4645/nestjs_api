import { Body, Controller, Get, Param, Post, Patch, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// controller is the place for 'Service' to inject its implemented logic
@Controller('users') // thus, the route will be {{baseURL/users}}
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}
  @Get() // Get all users /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') 
  {
    return this.usersService.findAll(role)
  }

  @Get('interns') // Get /users/interns
  findAllInterns() {
    return []
  }

  @Get(':id') // Get specific user by id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id) // Unary Plus (+) is a method to convert data to number, better than parseInt() function
  }

  @Post() // POST /users
  create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto)
  }

  @Patch(':id') // Patch specific user by id
  update (@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id') // delete specific user by id
  delete (@Param('id') id: string, @Body() userUpdate: {}) {
    return this.usersService.delete(+id)
  }
}
