import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSignup } from '../entity/user.dto';
import fs, { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import AccessToken from 'twilio/lib/jwt/AccessToken';
import { Role } from '../entity/role.enum';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthServerService {
  // Creating instance of JWT Service
  constructor(private jwtService:JwtService){}

  private userdb : UserSignup[] = []

  // CREATE
  async createUser(user:UserSignup):Promise<boolean>{
    if(await this.findOne(user.netId)){
      return false
    }

    this.userdb.push(user)
    console.log(user)
    return true
  }

  async loadMockUserCred(){
    fs.readFile('/home/axjh03/mav-housing-config/apps/auth-server/entity/sample_user_cred.json', 'utf-8', (err, data) => {
      if(err){
        console.log("Error Reading File: ", err)
        return
      }
      try {
        this.userdb = JSON.parse(data);
        console.log("Loaded Users:", this.userdb);
      } catch (e) {
        console.log("JSON Parse Error:", e);
      }
    })
  }

  // READ
  getHello():string{
    return 'Hello world'
  }

  getAllUser(){
    return this.userdb
  }

  // UPDATE

  // DELETE

  // SEARCH
  async findOne(username:string):Promise<UserSignup | undefined>{
    return this.userdb.find(user => user.netId === username)
  }



  // AUTH STUFF
  async signin(netId:string, password:string){
    const user = await this.findOne(netId);
    if(user){
      if(user.password != password){
        throw new UnauthorizedException();
      }
      
      // Could add 10-digit UTA ID later... in the payload
      const payload = {username: user.netId,
        Role: user.role,
        jti:randomUUID() // ensures unique token per login
        }
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    }
  }
}
