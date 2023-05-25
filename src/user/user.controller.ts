import { Controller, Get,Post, Body,Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user.dto';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
   
    @Get('/')
    async getUsers() {
        const allUsers = await this.userService.getAllUsers();
        return allUsers;
        }

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        const user = await this.userService.findUser(id);
        return user;
    }    
    
    @Post('/signup')
    async addUser(@Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.addUser(createUserDTO);
        return user;
    }
}
