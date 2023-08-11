import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

    constructor(@InjectModel('users') private userModel: Model<User>) {}

    async create(req: CreateUserDto,res:any)
    {
        try{
             const userExist= await this.userModel.findOne({email:req.email});
             if(userExist===null){
                 const salt =await bcrypt.genSalt(10);
                 req.password = await bcrypt.hash(req.password, salt);
                 const createdUser = new this.userModel(req);
                 createdUser.save();
                return await res.status(200).send({message:'Success',data:req});
             }
             else{
                 return await res.status(400).send({success:false,message:'User Already Exist'});
             }
        }
        catch(err:any)
        {
            return await res.status(500).send({success: false,message:'something went Wrong'});
        }
    }

    async getAllUsers(res:any)
    {
        try{
              const data = await this.userModel.find();
              if(data!==null)
              {

                  return await res.status(200).send({succes:true,message:'users found successfully', data: data});

              }
              else {
                return await res.status(400).send({succes:false,message:'cannot'});
              }

        }
        catch(err:any)
        {
            return await res.status(500).send({success: false,message:'something went Wrong'});

        }
    }

    async updateUser(id:string,req:any,res:any)
    {
        try{
              const data = this.userModel.findByIdAndUpdate(id,req.body,{new:true}).exec();
              return await res.status(200).send({succes:true,message:'users updated successfully', data: data});
        }
        catch(err:any)
        {
            return await res.status(500).send({success: false,message:'something went Wrong'});

        }
    }

    async deleteUserByQuery(id:string,res:any)
    {
         try{
              const data = await this.userModel.findByIdAndDelete({_id:id});
             return await res.status(200).send({success: true, message : 'user deleted',delete:data});
         }
         catch(err: any)
         {
            return await res.status(500).send({success: false,message:err.message});
         }
    }
}
