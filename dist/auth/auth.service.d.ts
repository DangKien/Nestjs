import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AccountLogin } from './entities/account.entities';
export declare class AuthService {
    private userService;
    private jwtTokenService;
    private mailService;
    private accountFBRepository;
    constructor(userService: UserService, jwtTokenService: JwtService, mailService: MailService, accountFBRepository: Repository<AccountLogin>);
    validateUser(username: string, pass: string): Promise<User>;
    loginWithCredentials(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    googleLogin(req: any): Promise<any>;
    loginFacebook(req: any): Promise<any>;
}
