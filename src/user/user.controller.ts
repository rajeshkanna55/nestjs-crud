import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { JoiValidationPipe } from './validation/user.validation';
import { CreateUserDto } from './dto/user.dto';
import { createUserSchema, updateUserSchema } from './interface/user.interface';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('user')

@ApiTags('user')

export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('registration')
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() req: CreateUserDto, @Res() res: any) {
    
    try {

      return await this.userService.create(req, res);

    } 
    catch (err) {

      return await res.status(500).send({ message: 'something went wrong' });

    }
  }

  @Get('getall')
  async getAllUsers(@Res() res:any){

    try{

        return await this.userService.getAllUsers(res);
    }
    catch(err:any)
    {

        return await res.status(500).send({ message: 'something went wrong' });

    }
  }

  @Post('update/:id')
  @ApiBody({ type: CreateUserDto })
//   @UsePipes(new JoiValidationPipe(updateUserSchema))
  async updateUser(@Param('id') id:string , @Req() req : any, @Res() res: any)
  {
     try {
        
           return await this.userService.updateUser(id,req,res)

     }
     catch(err:any)
     {

        return await res.status(500).send({ message: 'something went wrong' });

     }
  }
  @Delete('delete')
//   @ApiBody({ type: CreateUserDto })
  @ApiQuery({name:'userid'})
//   @UsePipes(new JoiValidationPipe(updateUserSchema))
  async deleteUserByQuery(@Query() params : { userid?:string}, @Res() res: any)
  {
     try {  
          const id = params.userid;
          if(id)
          { 
              return await this.userService.deleteUserByQuery(id,res)
          }
          else{
            return await res.status(400).send({ message: 'cannot get id' });
          }
     }
     catch(err:any)
     {

        return await res.status(500).send({ message: err.message });

     }
  }
}

