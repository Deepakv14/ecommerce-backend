import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService:UserService, 
        private jwtService:JwtService) {}

    async signIn(username:string, pass:string):Promise<any> {
        const user = await this.usersService.findUser(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
          }
        
          console.log('user', user);

        //   const { password, ...result } = user;
          // TODO: Generate a JWT and return it here
          // instead of the user object
          const payload = { sub:user._id, username: user.username};
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
    }
}
